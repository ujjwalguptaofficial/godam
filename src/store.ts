import { Mutations, Tasks, DerivedList } from "./abstracts";
import { Observer, EventBus } from "./helpers";

export interface IStore {
    state;
    mutations?: typeof Mutations | any;
    derivedList?: typeof DerivedList | any;
    tasks?: typeof Tasks;
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

        let mutations = store.mutations;
        mutations = mutations ? new store.mutations() : {} as any;
        mutations.state = this.__state__;
        this.__mutation__ = mutations as any;

        const derived = store.derivedList;
        this.__derived__ = derived ?
            new store.derivedList(this.state) : {};

        modules = modules as any || {};
        this.module = typeof modules === "function" ? new (modules as any)() : modules;

        const task = store.tasks;
        this.__task__ = task ? new store.tasks({
            state: this.state,
            commit: this.commit,
            derive: this.derive,
            do: this.do
        }) : {} as any;

        this.__ob__ = new Observer(this.__onChange__.bind(this));
        this.__ob__.create(this.__state__);
        const stateKeys = {};
        for (const key in this.__state__) {
            stateKeys[key] = key;
        };
        this.STATE = stateKeys as any;

        const mutationKeys = {};
        for (const key in this.__mutation__) {
            mutationKeys[key] = key;
        }
        this.MUTATION = mutationKeys as any;
    }

    do(name: string, payload?: any, moduleName?: string) {
        let task;
        if (moduleName) {
            const module = this.module[moduleName];
            task = module && module.__task__[name];
        }
        else {
            task = this.__task__[name];
        }

        if (!task) return console.error(`No task exist with name ${name} ${moduleName ? "" : "& module " + moduleName}`);
        return task(payload);
    }

    commit(name: string, payload: any, moduleName?: string) {
        let mutation;
        let ctx;
        if (moduleName) {
            const module = this.module[moduleName];
            ctx = module && module.__mutation__;
        }
        else {
            ctx = this.__mutation__;
        }
        mutation = ctx[name]
        if (!mutation) return console.error(`No mutation exist with name ${name} ${moduleName ? "" : "& module " + moduleName}`);
        mutation.call(ctx, payload);
    }

    state(name: string, moduleName?: string) {
        let state;
        if (moduleName) {
            const module = this.module[moduleName];
            state = module && module.__state__[name];
        }
        else {
            state = this.__state__[name];
        }
        if (state === undefined) return console.error(`No state exist with name ${name} ${moduleName ? "" : "& module " + moduleName}`);
        return state;
    }

    derive(name: string, moduleName?: string) {
        let derived;
        if (moduleName) {
            const module = this.module[moduleName];
            derived = module && module.__derived__[name];
        }
        else {
            derived = this.__derived__[name];
        }
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