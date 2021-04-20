import { Room } from "../abstracts";
import { IStore } from "../store";
import { IGodamRoom } from "../interfaces";
import { Observer } from "./observer";
import { EventBus } from "./event_bus";
export function initRoom(this: Room, store: IStore, isParent?: boolean) {
    this['__state__'] = typeof store.state === 'function' ? new store.state() : store.state;

    const stateKeys = {};
    for (const key in this['__state__']) {
        stateKeys[key] = key;
    };
    this.STATE = stateKeys as any;

    let mutations = store.mutations;
    mutations = mutations ? new store.mutations() : {} as any;
    mutations.state = this['__state__'];
    this['__mutation__'] = mutations as any;

    const mutationKeys = {};
    for (const key in this['__mutation__']) {
        mutationKeys[key] = key;
    }
    this.MUTATION = mutationKeys as any;

    let expression = store.expressions || {};
    expression = typeof expression === "function" ?
        new store.expressions() : expression;
    const get = this.get.bind(this);

    Object.assign(expression, {
        STATE: stateKeys,
        get: get
    })
    this['__expression__'] = expression;

    const expressionKeys = {};
    for (const key in this['__expression__']) {
        expressionKeys[key] = key;
    }

    this.EXPRESSION = expressionKeys;

    const task = store.tasks || {};
    this['__task__'] = typeof task === "function" ? new task() : task as any;

    const taskKeys = {};
    for (const key in this['__task__']) {
        taskKeys[key] = key;
    }
    this.TASK = taskKeys;

    Object.assign(this['__task__'], {
        get: get,
        commit: this.commit.bind(this),
        eval: this.eval.bind(this),
        do: this.do,
        STATE: this.STATE,
        MUTATION: this.MUTATION,
        TASK: taskKeys,
        EXPRESSION: expressionKeys
    })

    this['__watchBus__'] = new EventBus(this);

    if (store.track !== false) {
        this['__ob__'] = new Observer(this['__onChange__'].bind(this));
        this['__ob__'].create(this['__state__']);
    }
}