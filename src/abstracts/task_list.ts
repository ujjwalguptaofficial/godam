import { GODAM_STATE } from "../type";

interface ITaskList {
    state;
    commit;
    derive;
    do;
}

export class TaskList implements ITaskList {
    state: GODAM_STATE;
    commit: (name: string, payload: string, moduleName: string) => void;
    derive: (name: string, moduleName: string) => any;
    do: (name: string, payload: string, moduleName: string) => any;

    constructor(value: ITaskList) {
        this.state = value.state;
        this.commit = value.commit;
        this.derive = value.derive;
        this.do = value.do;
    }
}