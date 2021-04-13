export type STORE_MODULE = { [key: string]: Godam }
import { MutationList, TaskList, DerivedList } from "./abstracts";

export interface IStore {
    state;
    mutations: typeof MutationList;
    derivedList: typeof DerivedList;
    tasks: typeof TaskList;
}

export class Godam {
    __state__;
    __mutation__: MutationList;
    __derived__;
    __task__: TaskList;
    __module__: STORE_MODULE;

    constructor(store: IStore, module?: STORE_MODULE) {
        this.__state__ = store.state;
        const mutations = new store.mutations(this.__state__);
        for (const key in this.__state__) {
            mutations["set" + key] = function (payload) {
                this.state[key] = payload;
            };
        }
        this.__mutation__ = mutations;
        this.__derived__ = new store.derivedList(this.__state__);
        this.__module__ = module;

        this.__task__ = new store.tasks({
            state: this.state,
            commit: this.commit,
            derive: this.derive,
            do: this.do
        });

    }

    do(name: string, payload: string, moduleName: string) {
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

    commit(name: string, payload: string, moduleName: string) {
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

    state(name: string, moduleName: string) {
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

    derive(name: string, moduleName: string) {
        let derived;
        if (moduleName) {
            const module = this.__module__[moduleName];
            derived = module && module.__state__[name];
        }
        else {
            derived = this.__state__[name];
        }
        if (!derived) return console.error(`No state exist with name ${name} ${moduleName ? "" : "& module " + moduleName}`);
        return derived(name);
    }
}