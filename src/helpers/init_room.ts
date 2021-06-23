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

    Object.assign(expression, {
        get: get
    })
    this['__expression__'] = expression;

    const task = store.tasks || {};
    this['__task__'] = typeof task === "function" ? new task() : task as any;

    Object.assign(this['__task__'], {
        get: get,
        commit: this.commit.bind(this),
        eval: this.eval.bind(this),
        do: this.do,
    })

    this['__watchBus__'] = new EventBus(this);

    if (store.track !== false) {
        this['__ob__'] = new Observer(this['__onChange__'].bind(this));
        this['__ob__'].create(this['__state__']);
    }
}