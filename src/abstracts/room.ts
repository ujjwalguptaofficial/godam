import { IGodamRoom, IRoomStore } from "../interfaces";
import { Mutation } from "./mutation";
import { Task } from "./task_list";
import { Observer, EventBus } from "../helpers";

export class Room<T_STATE = {}, T_MUTATION = {}, T_EXPRESSION = {}, T_TASK = {}> implements IGodamRoom {

    private __prefix__: string;
    private __state__: { [key: string]: any };
    private __mutation__: Mutation;
    private __expression__;
    private __task__: Task;
    private __ob__: Observer;

    private __computed__;

    private __watchBus__: EventBus;

    private __private__: { store: IRoomStore } = {} as any;

    constructor(store: IRoomStore) {
        this.__private__.store = store;
    }

    __getNameWithRoom__(name: string, roomName?: string) {
        return name.includes("@") ? name :
            name + "@" + (roomName || this.__prefix__);
    }

    do(taskName: keyof T_TASK, payload?: any);
    do(taskName: string, payload?: any);
    do(name: any, payload?) {
        const result = this.__watchBus__.emitSync("do", this.__getNameWithRoom__(name), payload);
        return result[0];
    }

    set(name: keyof T_MUTATION, payload?)
    set(name: string, payload?)
    set(name: any, payload?) {
        const result = this.__watchBus__.emitSync("commit", this.__getNameWithRoom__(name as any), payload);
        // return result[0];
    }

    get(name: keyof T_STATE): any;
    get(name: string): any;
    get(name: any, roomName?: string) {
        const result = this.__watchBus__.emitSync("get", this.__getNameWithRoom__(name, roomName));
        return result[0];
    }

    eval(name: keyof T_EXPRESSION, payload?: any)
    eval(name: string, payload?: any)
    eval(name: any, payload?: any) {
        const result = this.__watchBus__.emitSync("eval", this.__getNameWithRoom__(name), payload);
        return result[0];
    }

    private __onChange__(key, newValue, oldValue) {
        this.__watchBus__.emit("change", key, newValue, oldValue);
        this.__watchBus__.emit(key, newValue, oldValue);
    }

    watch(propName: keyof T_STATE, cb: (newValue, oldValue) => void);
    watch(propName: string, cb: (newValue, oldValue) => void);
    watch(propName: any, cb: (newValue, oldValue) => void) {
        this.__watchBus__.on(propName, cb);
        return this;
    }

    unwatch(propName: keyof T_STATE, cb?: (newValue, oldValue) => void)
    unwatch(propName: string, cb?: (newValue, oldValue) => void)
    unwatch(propName: any, cb?: (newValue, oldValue) => void) {
        this.__watchBus__.off(propName, cb);
        return this;
    }

}
