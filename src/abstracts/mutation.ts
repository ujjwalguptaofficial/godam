export class Mutation<T_STATE = {}> {
    state: T_STATE;

    createMutation(state, log?: boolean) {
        return function (value) {
            if (log) {
                console.log(`mutation ${state} called with arguments - `, value);
            }
            this.state[state] = value;
        }
    }
}