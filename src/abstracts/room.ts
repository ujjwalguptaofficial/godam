import { IGodamRoom } from "../interfaces";
import { Godam } from "../store";

export class Room implements IGodamRoom {
    private __prefix__: string;

    __getNameWithPrefix__(name: string) {
        return name + "@" + this.__prefix__;
    }

    do(name: string, payload?) {
        this.__store__.do(this.__getNameWithPrefix__(name), payload);
    }

    commit(name: string, payload?) {
        this.__store__.commit(this.__getNameWithPrefix__(name), payload);
    }

    get(name: string) {
        this.__store__.get(name, this.__prefix__);
    }

    derive(name: string) {
        this.__store__.derive(this.__getNameWithPrefix__(name));
    }

    private __store__: Godam
}