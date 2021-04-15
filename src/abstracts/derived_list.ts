import { GODAM_STATE } from "../type";

export class DerivedList<T_STATE = void> {
    state: GODAM_STATE
    STATE: T_STATE

    constructor(state: GODAM_STATE) {
        this.state = state;
    }
}