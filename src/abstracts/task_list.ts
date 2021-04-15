import { GODAM_STATE } from "../type";

interface ITaskList {
    state;
    commit;
    derive;
    do;
}

export class Tasks<T_STATE = void, T_MUTATION = void, T_TASK = void> implements ITaskList {
    STATE: T_STATE
    MUTATION: T_MUTATION
    TASK: T_TASK

    state: GODAM_STATE;
    commit: (name: string, payload: string, moduleName: string) => void;
    derive: (name: string, moduleName: string) => any;
    do: (name: string, payload?: string, moduleName?: string) => any;

    constructor(value: ITaskList) {
        this.state = value.state;
        this.commit = value.commit;
        this.derive = value.derive;
        this.do = value.do;
    }
}