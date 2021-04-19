import { GODAM_STATE } from "../type";

export class DerivedList<T_STATE = void> {
    get: GODAM_STATE
    STATE: T_STATE

    constructor(state: GODAM_STATE) {
        this.get = state;
    }
}