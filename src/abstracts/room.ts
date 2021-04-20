import { IGodamRoom } from "../interfaces";
import { Godam, IStore } from "../store";
import { Mutations } from "./mutation";
import { Tasks } from "./task_list";
import { Observer } from "../helpers/observer";
import { initRoom } from "../helpers";

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


    constructor(store: IStore) {
        initRoom.call(this, store);
    }

    __getNameWithRoom__(name: string) {
        return name.includes("@") ? name :
            name + "@" + this.__prefix__;
    }

    do(name: string, payload?) {
        this.__store__.do(this.__getNameWithRoom__(name), payload);
    }

    commit(name: string, payload?) {
        this.__store__.commit(this.__getNameWithRoom__(name), payload);
    }

    get(name: string) {
        return this.__store__.get(this.__getNameWithRoom__(name));
    }

    eval(name: string, payload?: any) {
        return this.__store__.eval(this.__getNameWithRoom__(name), payload);
    }

    private __onChange__(key, newValue, oldValue) {
        this.__store__['__onChange__'](key, newValue, oldValue);
    }

    private __store__: Godam
}