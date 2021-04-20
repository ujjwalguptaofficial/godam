import { GODAM_STATE } from "../type";

export class Expressions<T_STATE = void> {
    get: GODAM_STATE
    STATE: { [P in keyof T_STATE]-?: P }
}