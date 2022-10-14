import { GODAM_STATE } from "../type";
import { computed } from "../decorators";

export class Expression<T_STATE = void> {

    markComputed(methodName: string, ...dependencies) {
        let descriptor = Object.getOwnPropertyDescriptor(this, methodName) ||
            Object.getOwnPropertyDescriptor(this['__proto__'], methodName);
        computed(...dependencies)(this, methodName, descriptor);
    }

    protected get<T = any>(name: keyof T_STATE, moduleName?: string): T;
    protected get<T = any>(name: string, moduleName?: string): T;
    protected get<T = any>(name: any, moduleName?: string): T {
        return null as T;
    }

}