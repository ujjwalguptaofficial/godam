import { GODAM_STATE } from "../type";
import { computed } from "../decorators";

export class Expression<T_STATE = void> {

    markComputed(methodName: string, ...dependencies) {
        let descriptor = Object.getOwnPropertyDescriptor(this, methodName) ||
            Object.getOwnPropertyDescriptor(this['__proto__'], methodName);
        computed(...dependencies)(this, methodName, descriptor);
    }

    protected get(name: keyof T_STATE, moduleName?: string): any;
    protected get(name: string, moduleName?: string): any;
    protected get(name: any, moduleName?: string): any {
    }

}