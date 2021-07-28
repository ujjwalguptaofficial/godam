import { GODAM_STATE } from "../type";
import { Computed } from "../decorators";

export class Expression<T_STATE = void> {
    protected get: GODAM_STATE<T_STATE>

    markComputed(dependencies: string[], methodName: string) {
        let descriptor = Object.getOwnPropertyDescriptor(this, methodName) ||
            Object.getOwnPropertyDescriptor(this['__proto__'], methodName);
        Computed(...dependencies)(this, methodName, descriptor);
    }
}