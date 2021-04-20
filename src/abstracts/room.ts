import { IGodamRoom } from "../interfaces";
import { Godam, IStore } from "../store";
import { Mutations } from "./mutation";
import { Tasks } from "./task_list";
import { Observer } from "../helpers/observer";
import { initRoom, EventBus } from "../helpers";

export class Room<T_STATE = {}, T_MUTATION = {}, T_DERIVED = {}, T_TASK = {}> implements IGodamRoom {

    STATE: { [P in keyof T_STATE]-?: P };
    MUTATION: { [P in keyof T_MUTATION]-?: P };
    EXPRESSION: { [P in keyof T_DERIVED]-?: P };
    TASK: { [P in keyof T_TASK]-?: P };

    private __prefix__: string;
    private __state__: { [key: string]: any };
    private __mutation__: Mutations;
    private __expression__;
    private __task__: Tasks;
    private __ob__: Observer;

    private __watchBus__: EventBus;

    constructor(store: IStore) {
        initRoom.call(this, store);
    }

    __getNameWithRoom__(name: string) {
        return name.includes("@") ? name :
            name + "@" + this.__prefix__;
    }

    do(name: string, payload?) {
        const result = this.__watchBus__.emitSync("do", this.__getNameWithRoom__(name), payload);
        return result[0];
    }

    commit(name: string, payload?) {
        const result = this.__watchBus__.emitSync("commit", this.__getNameWithRoom__(name), payload);
        return result[0];
    }

    get(name: string) {
        const result = this.__watchBus__.emitSync("get", this.__getNameWithRoom__(name));
        return result[0];
    }

    eval(name: string, payload?: any) {
        const result = this.__watchBus__.emitSync("eval", this.__getNameWithRoom__(name), payload);
        return result[0];
    }

    private __onChange__(key, newValue, oldValue) {
        this.__watchBus__.emit("change", key, newValue, oldValue);
    }

}