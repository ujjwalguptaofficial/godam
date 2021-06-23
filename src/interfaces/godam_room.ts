import { GODAM_EVAL } from "../type";

export interface IGodamRoom {
    do(taskName: string, payload?: any);
    commit(mutationName: string | any, payload?: any): void
    get(name: string, moduleName?: string)
    eval: GODAM_EVAL<any>
}