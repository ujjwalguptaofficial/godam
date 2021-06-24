import { GODAM_EVAL } from "../type";

export interface IGodamRoom {
    get(name: string, moduleName?: string)
    set(mutationName: string | any, payload?: any): void
    eval: GODAM_EVAL<any>
    do(taskName: string, payload?: any);
}