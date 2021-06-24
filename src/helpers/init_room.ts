import { Room } from "../abstracts";
import { IStore } from "../store";
import { IGodamRoom } from "../interfaces";
import { Observer } from "./observer";
import { EventBus } from "./event_bus";
export function initRoom(this: Room, store: IStore, isParent?: boolean) {
    this['__state__'] = typeof store.state === 'function' ? new store.state() : store.state;

    let mutations = store.mutations;
    mutations = mutations ? new store.mutations() : {} as any;
    mutations.state = this['__state__'];
    this['__mutation__'] = mutations as any;

    let expression = store.expressions || {};
    expression = typeof expression === "function" ?
        new store.expressions() : expression;
    const get = this.get.bind(this);

    expression['get'] = get;
    this['__expression__'] = expression;

    const task = store.tasks || {};
    this['__task__'] = typeof task === "function" ? new task() : task as any;

    Object.assign(this['__task__'], {
        get: get,
        set: this.set.bind(this),
        eval: this.eval.bind(this),
        do: this.do,
    })

    this['__watchBus__'] = new EventBus(this);

    if (store.track !== false) {
        const computed = this['__computed__'] || {};
        const reactives = [];
        for (const key in computed) {
            const data = computed[key];
            reactives.push(key);
            data.args.forEach(arg => {
                this.watch(arg, () => {
                    this[key] = data.fn.call(this);
                });
            })
        }

        this['__ob__'] = new Observer(this['__onChange__'].bind(this));
        const state = this['__state__'];
        this['__ob__'].create(state, Object.keys(state).concat(reactives));
    }
}