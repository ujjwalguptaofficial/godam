import { GODAM_STATE } from "../type";

export class Expression<T_STATE = void> {
    protected get: GODAM_STATE<T_STATE>
}