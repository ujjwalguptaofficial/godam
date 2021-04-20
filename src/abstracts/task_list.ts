import { GODAM_STATE } from "../type";

interface ITaskList {
    get;
    commit;
    eval;
    do;
}

export class Tasks<T_STATE = void, T_MUTATION = void, T_EXPRESSION = {}, T_TASK = void> implements ITaskList {
    STATE: { [P in keyof T_STATE]-?: P };
    MUTATION: { [P in keyof T_MUTATION]-?: P };
    EXPRESSION: { [P in keyof T_EXPRESSION]-?: P };

    get: GODAM_STATE;
    commit: (name: string, payload: any, moduleName?: string) => void;
    eval: (expressionName: string, payload?) => any;
    do: (name: string, payload?: any, moduleName?: string) => any;


}