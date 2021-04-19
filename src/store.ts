import { Mutations, Tasks, DerivedList, State } from "./abstracts";
import { Observer, EventBus } from "./helpers";
import { Module } from "module";

export interface IStore {
    state: typeof State | any;
    mutations?: typeof Mutations | any;
    derivedList?: typeof DerivedList | any;
    tasks?: typeof Tasks | any;

    track?: boolean;
}

const getNameAndModule = (name: string) => {
    const splitName = name.split("@");
    return {
        name: splitName[0],
        moduleName: splitName[1]
    }
}

export class Godam<T_STATE = {}, T_MUTATION = {}, T_DERIVED = {}, T_TASK = {}, T_MODULE = {}> {
    STATE: { [P in keyof T_STATE]-?: P };
    MUTATION: { [P in keyof T_MUTATION]-?: P };
    DERIVED: { [P in keyof T_DERIVED]-?: P };
    TASK: { [P in keyof T_TASK]-?: P };
    private __state__: { [key: string]: any };
    private __mutation__: Mutations;
    private __derived__;
    private __task__: Tasks;
    module: { [P in keyof T_MODULE]-?: T_MODULE[P]; };
    private __ob__: Observer;
    private __watchBus__ = new EventBus(this);

    constructor(store: IStore, modules?: { [key: string]: any }) {
        this.__state__ = typeof store.state === 'function' ? new store.state() : store.state;

        const stateKeys = {};
        for (const key in this.__state__) {
            stateKeys[key] = key;
        };
        this.STATE = stateKeys as any;

        let mutations = store.mutations;
        mutations = mutations ? new store.mutations() : {} as any;
        mutations.state = this.__state__;
        this.__mutation__ = mutations as any;

        const mutationKeys = {};
        for (const key in this.__mutation__) {
            mutationKeys[key] = key;
        }
        this.MUTATION = mutationKeys as any;

        const derived = store.derivedList;
        this.__derived__ = derived ?
            new store.derivedList(this.state) : {};

        modules = modules as any || {};
        this.module = typeof modules === "function" ? new (modules as any)() : modules;

        const task = store.tasks || {};
        this.__task__ = typeof task === "function" ? new task() : task as any;

        Object.assign(this.__task__, {
            state: this.state.bind(this),
            commit: this.commit.bind(this),
            derive: this.derive,
            do: this.do,
            STATE: this.STATE,
            MUTATION: this.MUTATION
        })


        if (store.track !== false) {
            this.__ob__ = new Observer(this.__onChange__.bind(this));
            this.__ob__.create(this.__state__);
        }
    }

    do(taskName: string, payload?: any) {
        let { name, moduleName } = getNameAndModule(taskName);
        const ctx = this.__getCtx__("__task__", moduleName);
        const task = ctx[name]
        if (!task) return console.error(`No task exist with name ${taskName} ${moduleName ? "" : "& module " + moduleName}`);
        return task.call(ctx, payload);
    }

    __getCtx__(prop: string, moduleName: string) {
        let ctx;
        if (moduleName) {
            const module = this.module[moduleName];
            ctx = module && module[prop];
        }
        else {
            ctx = this[prop];
        }
        return ctx;
    }

    commit(mutationName: string, payload?: any) {
        let { name, moduleName } = getNameAndModule(mutationName);
        const ctx = this.__getCtx__("__mutation__", moduleName);
        const mutation = ctx[name]
        if (!mutation) return console.error(`No mutation exist with name ${mutationName} ${moduleName ? "" : "& module " + moduleName}`);
        mutation.call(ctx, payload);
    }

    state(name: string, moduleName?: string) {
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

    derive(name: string, moduleName?: string) {
        const ctx = this.__getCtx__("__derived__", moduleName);
        const derived = ctx[name]
        if (derived === undefined) return console.error(`No state exist with name ${name} ${moduleName ? "" : "& module " + moduleName}`);
        if (!derived) return console.error(`No state exist with name ${name} ${moduleName ? "" : "& module " + moduleName}`);
        return derived(name);
    }

    private __onChange__(key, newValue, oldValue) {
        this['__watchBus__'].emit(key, newValue, oldValue);
    }


    watch(propName: string, cb: (newValue, oldValue) => void) {
        this.__watchBus__.on(propName, cb);
        return this;
    }

    unwatch(propName: string, cb?: (newValue, oldValue) => void) {
        this.__watchBus__.off(propName, cb);
        return this;
    }
}