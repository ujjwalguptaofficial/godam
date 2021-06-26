import { Mutations, Tasks, Expressions, Room } from "./abstracts";
import { Observer, EventBus, initRoom } from "./helpers";
import { IGodamRoom } from "./interfaces";
import { getNameAndModule } from "./utils";

export interface IStore {
    state: any;
    mutations?: typeof Mutations | any;
    expressions?: typeof Expressions | any;
    tasks?: typeof Tasks | any;
    track?: boolean;
}

export class Godam<T_STATE = {}, T_MUTATION = {}, T_DERIVED = {}, T_TASK = {}, T_MODULE = {}> implements IGodamRoom {

    private __state__: { [key: string]: any };
    private __mutation__: Mutations;
    private __expression__;
    private __task__: Tasks;
    private __ob__: Observer;
    private __watchBus__: EventBus;

    rooms: { [P in keyof T_MODULE]-?: T_MODULE[P]; };

    constructor(store: IStore, rooms?: { [key: string]: Room }) {

        initRoom.call(this, store);

        rooms = rooms as any || {};
        rooms = typeof rooms === "function" ? new (rooms as any)() : rooms;
        this.rooms = rooms as any;
        for (const key in rooms) {
            const room = rooms[key];
            room['__prefix__'] = key;
            initRoom.call(room, room['__private__'].store, () => {
                room['__watchBus__'].on("do", (name: string, payload?: any) => {
                    return this.do(name, payload);
                }).on("commit", (name: string, payload?: any) => {
                    return this.set(name, payload);
                }).on("eval", (name: string, payload?: any) => {
                    return this.eval(name, payload);
                }).on("get", (name, roomName) => {
                    return this.get(name, roomName);
                }).on("change", (prop, newVal, oldValue) => {
                    return this.__onChange__(`${prop}@${key}`, newVal, oldValue);
                })
            });
        }
    }

    do(taskName: keyof T_TASK, payload?: any);
    do(taskName: string, payload?: any);
    do(taskName: any, payload?: any) {
        let { name, moduleName } = getNameAndModule(taskName);
        const ctx = this.__getCtx__("__task__", moduleName);
        const task = ctx[name]
        if (!task) return console.error(`No task exist with name ${taskName} ${moduleName ? "" : "& module " + moduleName}`);
        return task.call(ctx, payload);
    }

    set(mutationName: keyof T_MUTATION, payload?: any): void;
    set(mutationName: string, payload?: any): void;
    set(mutationName: any, payload?: any) {
        let { name, moduleName } = getNameAndModule(mutationName as string);
        const ctx = this.__getCtx__("__mutation__", moduleName);
        const mutation = ctx[name]
        if (!mutation) return console.error(`No mutation exist with name ${mutationName} ${moduleName ? "" : "& module " + moduleName}`);
        mutation.call(ctx, payload);
    }

    get(name: keyof T_STATE, moduleName?: string): any;
    get(name: string, moduleName?: string): any;
    get(name: any, moduleName?: string) {
        if (!moduleName) {
            const result = getNameAndModule(name);
            name = result.name;
            moduleName = result.moduleName;
        }
        const ctx = this.__getCtx__("__state__", moduleName);
        if (name in ctx) {
            return ctx[name];
        }
        return console.error(`No state exist with name ${name} ${moduleName ? "" : "& module " + moduleName}`);
    }

    eval(expressionName: keyof T_DERIVED, payload?)
    eval(expressionName: string, payload?)
    eval(expressionName: any, payload?) {
        let { name, moduleName } = getNameAndModule(expressionName);
        const ctx = this.__getCtx__("__expression__", moduleName);
        if (name in ctx) {
            if (ctx[name].call) {
                return ctx[name].call(ctx, payload);
            }
            return ctx[name];
        }
        throw `No state exist with name ${name} ${moduleName ? "" : "& module " + moduleName}`;
    }

    watch(propName: keyof T_STATE, cb: (newValue, oldValue) => void);
    watch(propName: string, cb: (newValue, oldValue) => void);
    watch(propName: any, cb: (newValue, oldValue) => void) {
        this.__watchBus__.on(propName, cb);
        return this;
    }

    unwatch(propName: keyof T_STATE, cb?: (newValue, oldValue) => void)
    unwatch(propName: string, cb?: (newValue, oldValue) => void)
    unwatch(propName: any, cb?: (newValue, oldValue) => void) {
        this.__watchBus__.off(propName, cb);
        return this;
    }

    private __onChange__(key, newValue, oldValue) {
        this.__watchBus__.emit(key, newValue, oldValue);
    }

    private __getCtx__(prop: string, moduleName: string) {
        let ctx;
        if (moduleName && moduleName !== "root") {
            const module = this.rooms[moduleName];
            ctx = module && module[prop];
        }
        else {
            ctx = this[prop];
        }
        return ctx;
    }

}