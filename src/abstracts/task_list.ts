import { GODAM_STATE } from "../type";

interface ITaskList {
    get;
    commit;
    derive;
    do;
}

export class Tasks<T_STATE = void, T_MUTATION = void, T_DERIVED = {}, T_TASK = void> implements ITaskList {
    STATE: { [P in keyof T_STATE]-?: P };
    MUTATION: { [P in keyof T_MUTATION]-?: P };
    DERIVED: { [P in keyof T_DERIVED]-?: P };

    get: GODAM_STATE;
    commit: (name: string, payload: any, moduleName?: string) => void;
    derive: (name: string, moduleName?: string) => any;
    do: (name: string, payload?: any, moduleName?: string) => any;


}