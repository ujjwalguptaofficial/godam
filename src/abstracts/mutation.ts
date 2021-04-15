export class Mutations<T_STATE = void> {
    state: T_STATE;

    constructor(state) {
        this.state = state;
    }
}