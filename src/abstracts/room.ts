import { IGodamRoom } from "../interfaces";
import { Godam, IStore } from "../store";
import { Mutations } from "./mutation";
import { Tasks } from "./task_list";
import { Observer } from "../helpers/observer";
import { initRoom, EventBus } from "../helpers";
import { GODAM_EVAL } from "../type";

export class Room<T_STATE = {}, T_MUTATION = {}, T_DERIVED = {}, T_TASK = {}> implements IGodamRoom {

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

    do(taskName: keyof T_TASK, payload?: any);
    do(taskName: string, payload?: any);
    do(name: any, payload?) {
        const result = this.__watchBus__.emitSync("do", this.__getNameWithRoom__(name), payload);
        return result[0];
    }

    commit(name: keyof T_MUTATION, payload?)
    commit(name: string, payload?)
    commit(name: any, payload?) {
        const result = this.__watchBus__.emitSync("commit", this.__getNameWithRoom__(name as any), payload);
        return result[0];
    }

    get(name: keyof T_STATE): any;
    get(name: string): any;
    get(name: any) {
        const result = this.__watchBus__.emitSync("get", this.__getNameWithRoom__(name));
        return result[0];
    }

    eval: GODAM_EVAL<T_DERIVED>;

    private __onChange__(key, newValue, oldValue) {
        this.__watchBus__.emit("change", key, newValue, oldValue);
    }

}

Room.prototype.eval = function (name: string, payload?: any) {
    const result = this.__watchBus__.emitSync("eval", this.__getNameWithRoom__(name), payload);
    return result[0];
}