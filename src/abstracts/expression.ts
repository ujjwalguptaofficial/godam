import { GODAM_STATE } from "../type";
import { computed } from "../decorators";

export class Expression<T_STATE = void> {

    markComputed(methodName: string, ...dependencies) {
        let descriptor = Object.getOwnPropertyDescriptor(this, methodName) ||
            Object.getOwnPropertyDescriptor(this['__proto__'], methodName);
        computed(...dependencies)(this, methodName, descriptor);
    }

    protected get<T>(name: keyof T_STATE, moduleName?: string): T | any;
    protected get<T>(name: string, moduleName?: string): T | any;
    protected get<T>(name: any, moduleName?: string): T | any {
    }

}