import { GODAM_STATE, GODAM_TASK, GODAM_EVAL } from "../type";

// interface ITaskList {
//     protected get: GODAM_STATE<any>;
//     commit;
//     eval;
//     do;
// }

export class Tasks<T_STATE = void, T_MUTATION = void, T_EXPRESSION = {}, T_TASK = void> {

    protected get: GODAM_STATE<T_STATE>;

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