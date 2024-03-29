import { Mutation, Task, Room } from "./abstracts";
import { EventBus, initRoom } from "./helpers";
import { IGodamRoom, IGodamStore } from "./interfaces";
import { getNameAndModule } from "./utils";
import { Observer, } from "./helpers";


export class Godam<T_STATE = any, T_MUTATION = any, T_EXPRESSION = any, T_TASK = any, T_ROOM = any> implements IGodamRoom {

    private __state__: { [key: string]: any };
    private __mutation__: Mutation;
    private __expression__;
    private __task__: Task;
    private __ob__: Observer;
    private __watchBus__: EventBus;

    rooms: { [P in keyof T_ROOM]-?: T_ROOM[P]; };

    track: boolean;

    // this is useful when user wants to get the method and then call it later
    shouldCallExpression = true;

    constructor(store: IGodamStore) {
        if (this.track == null) {
            this.track = Godam.track;
        }

        initRoom.call(this, store);

        let rooms = store.rooms as any || {};
        rooms = typeof rooms === "function" ? new (rooms as any)() : rooms;
        this.rooms = rooms as any;
        for (const key in rooms) {
            const room = rooms[key];
            room['__prefix__'] = key;
            initRoom.call(room, room['__private__'].store, () => {
                const bus = room['__watchBus__'];
                bus.on("do", (name: string, payload?: any) => {
                    return this.do(name, payload);
                });
                bus.on("commit", (name: string, payload?: any) => {
                    return this.set(name, payload);
                });
                bus.on("eval", (name: string, payload?: any) => {
                    return this.eval(name, payload);
                });
                bus.on("get", (name, roomName) => {
                    return this.get(name, roomName);
                });
                bus.on("change", (prop, newVal, oldValue) => {
                    return this.__onChange__(`${prop}@${key}`, newVal, oldValue);
                })
            });
        }
    }

    do(taskName: keyof T_TASK, payload?: any);
    do(taskName: string, payload?: any);
    do(taskName: any, payload?: any) {
        let { name, moduleName } = getNameAndModule(taskName);
        const ctx = this.__getCtx__("__task__", moduleName) || {};
        const task = ctx[name]
        if (!task) {
            throw `No task exist with name ${name} ${moduleName ? "& module " + moduleName : ""}`.trim();
        }
        return task.call(ctx, payload);
    }

    set(mutationName: keyof T_MUTATION, payload?: any): void;
    set(mutationName: string, payload?: any): void;
    set(mutationName: any, payload?: any) {
        let { name, moduleName } = getNameAndModule(mutationName as string);
        const ctx = this.__getCtx__("__mutation__", moduleName) || {};
        const mutation = ctx[name]
        if (!mutation) {
            throw `No mutation exist with name ${name} ${moduleName ? "& module " + moduleName : ""}`.trim();
        }
        mutation.call(ctx, payload);
    }

    get(name: keyof T_STATE, moduleName?: string): any;
    get(name: string, moduleName?: string): any;
    get(stateName: any, moduleName?: string) {
        if (!moduleName) {
            const result = getNameAndModule(stateName);
            stateName = result.name;
            moduleName = result.moduleName;
        }
        const ctx = this.__getCtx__("__state__", moduleName);
        if (stateName in ctx) {
            return ctx[stateName];
        }
        throw `No state exist with name ${stateName} ${moduleName ? "& module " + moduleName : ""}`.trim();
    }

    eval(expressionName: keyof T_EXPRESSION, payload?)
    eval(expressionName: string, payload?)
    eval(expressionName: any, payload?) {
        let { name, moduleName } = getNameAndModule(expressionName);
        const room = this.__getRoom__(moduleName);
        const expression = room['__expression__'];

        if (name in expression) {
            const computedVal = room['__computed__'][name];
            // computed does not exist
            if (typeof computedVal === 'undefined') {
                const value = expression[name]
                if (value && value.call) {
                    return this.shouldCallExpression ? value.call(expression, payload) :
                        value.bind(expression);
                }
                return value;
            }
            else { // computed exist
                return computedVal;
            }
        }
        throw `No expression exist with name ${name} ${moduleName ? "& module " + moduleName : ""}`.trim();
    }

    private on(key: string, cb: (key, newValue, oldValue) => void) {
        this.__watchBus__.on(key, cb);
        return this;
    }

    private off(key: string, cb?: (key, newValue, oldValue) => void) {
        this.__watchBus__.off(key, cb);
        return this;
    }

    watch(propName: keyof T_STATE, cb: (newValue, oldValue) => void);
    watch(propName: string, cb: (newValue, oldValue) => void);
    watch(propName: string, cb: Function);
    watch(propName: any, cb: (newValue, oldValue) => void) {
        return this.on(propName, cb);
    }


    unwatch(propName: keyof T_STATE, cb: Function)
    unwatch(propName: string, cb: Function)
    unwatch(propName: any, cb: Function) {
        return this.off(propName, cb as any);
    }

    private __onChange__(key, newValue, oldValue) {
        this.__watchBus__.emit(key, newValue, oldValue);
        this.__watchBus__.emit("change", key, newValue, oldValue);
    }

    private __getRoom__(roomName: string) {
        const root = roomName && roomName !== "root" ?
            this.rooms[roomName] : this;
        if (root == null) {
            throw new Error(`no room found - ${roomName}`);
        }
        return root as Room;
    }

    private __getCtx__(prop: string, moduleName: string) {
        const room = this.__getRoom__(moduleName);
        return room[prop];
        // let ctx;
        // if (moduleName && moduleName !== "root") {
        //     const module = this.rooms[moduleName];
        //     ctx = module && module[prop];
        // }
        // else {
        //     ctx = this[prop];
        // }
        // return ctx;
    }

    static track = true;

}