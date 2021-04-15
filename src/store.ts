export type STORE_MODULE = { [key: string]: Godam<any> }
import { Mutations, Tasks, DerivedList } from "./abstracts";
import { Observer, EventBus } from "./helpers";

export interface IStore {
    state;
    mutations?: typeof Mutations | any;
    derivedList?: typeof DerivedList | any;
    tasks?: typeof Tasks;
}

export class Godam<T_STATE = void> {
    STATE: T_STATE;
    private __state__: { [key: string]: any };
    private __mutation__: Mutations;
    private __derived__;
    private __task__: Tasks;
    private __module__: STORE_MODULE;
    private __ob__: Observer;
    private __watchBus__ = new EventBus(this);

    constructor(store: IStore, module?: STORE_MODULE) {

        this.__state__ = typeof store.state === 'function' ? new store.state() : store.state;

        let mutations = store.mutations;
        mutations = mutations ? new store.mutations(this.__state__) : {} as any;
        for (const key in this.__state__) {
            const name = "set" + key;
            if (!mutations[name]) {
                mutations[name] = function (payload) {
                    this.state[key] = payload;
                };
            }
        }
        this.__mutation__ = mutations as any;
        const derived = store.derivedList;
        this.__derived__ = derived ?
            new store.derivedList(this.state) : {};
        this.__module__ = module;
        const task = store.tasks;
        this.__task__ = task ? new store.tasks({
            state: this.state,
            commit: this.commit,
            derive: this.derive,
            do: this.do
        }) : {} as any;

        this.__ob__ = new Observer(this.__onChange__.bind(this));
        this.__ob__.create(this.__state__);

        this.STATE = this.__state__ as any;
    }

    do(name: string, payload?: string, moduleName?: string) {
        let task;
        if (moduleName) {
            const module = this.__module__[moduleName];
            task = module && module.__task__[name];
        }
        else {
            task = this.__task__[name];
        }

        if (!task) return console.error(`No task exist with name ${name} ${moduleName ? "" : "& module " + moduleName}`);
        return task(payload);
    }

    commit(name: string, payload: string, moduleName?: string) {
        let mutation;
        if (moduleName) {
            const module = this.__module__[moduleName];
            mutation = module && module.__mutation__[name];
        }
        else {
            mutation = this.__mutation__[name];
        }

        if (!mutation) return console.error(`No mutation exist with name ${name} ${moduleName ? "" : "& module " + moduleName}`);
        mutation(payload);
    }

    state(name: string, moduleName?: string) {
        let state;
        if (moduleName) {
            const module = this.__module__[moduleName];
            state = module && module.__state__[name];
        }
        else {
            state = this.__state__[name];
        }
        if (!state) return console.error(`No state exist with name ${name} ${moduleName ? "" : "& module " + moduleName}`);
        return state;
    }

    derive(name: string, moduleName?: string) {
        let derived;
        if (moduleName) {
            const module = this.__module__[moduleName];
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