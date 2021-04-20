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

    const derived = store.derivedList;
    this['__derived__'] = derived ?
        new store.derivedList(this.get) : {};

    const task = store.tasks || {};
    this['__task__'] = typeof task === "function" ? new task() : task as any;

    const taskKeys = {};
    for (const key in this['__task__']) {
        taskKeys[key] = key;
    }
    this.TASK = taskKeys;
    
    Object.assign(this['__task__'], {
        get: this.get.bind(this),
        commit: this.commit.bind(this),
        derive: this.derive,
        do: this.do,
        STATE: this.STATE,
        MUTATION: this.MUTATION,
        TASK: taskKeys
    })

    if (isParent) {
        this['__watchBus__'] = new EventBus(this);
    }

    if (store.track !== false) {
        this['__ob__'] = new Observer(this['__onChange__'].bind(this));
        this['__ob__'].create(this['__state__']);
    }
}