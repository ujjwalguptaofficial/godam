import { GODAM_STATE, GODAM_TASK, GODAM_MUTATION, GODAM_EVAL } from "../type";

// interface ITaskList {
//     protected get: GODAM_STATE<any>;
//     commit;
//     eval;
//     do;
// }

export class Tasks<T_STATE = void, T_MUTATION = void, T_EXPRESSION = {}, T_TASK = void> {
    STATE: { [P in keyof T_STATE]-?: P };
    MUTATION: { [P in keyof T_MUTATION]-?: P };
    EXPRESSION: { [P in keyof T_EXPRESSION]-?: P };

    protected get: GODAM_STATE<T_STATE>;
    protected commit(name: keyof T_STATE, payload?: any);
    protected commit(name: string, payload?: any);
    protected commit(name: any, payload?: any) {

    }
    protected eval: GODAM_EVAL<T_EXPRESSION>;
    protected do: GODAM_TASK<T_TASK>
}