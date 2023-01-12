import { GODAM_STATE, GODAM_TASK, GODAM_EVAL } from "../type";

export class Task<T_STATE = void, T_MUTATION = void, T_EXPRESSION = {}, T_TASK = void> {

    // protected get: GODAM_STATE<T_STATE>;

    get(name: keyof T_STATE): any;
    get(name: string): any;
    get(name: any, roomName?: string) {
        
    }

    protected set(name: keyof T_MUTATION, payload?: any);
    protected set(name: string, payload?: any);
    protected set(name: any, payload?: any) {

    }

    protected eval(name: keyof T_EXPRESSION, payload?: any)
    protected eval(name: string, payload?: any)
    protected eval(name: any, payload?: any) {

    }

    protected do(taskName: keyof T_TASK, payload?: any)
    protected do(taskName: string, payload?: any)
    protected do(taskName: any, payload?: any) {

    }
}