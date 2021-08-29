import { Godam, Mutation, Room } from "godam";

class AccountState {
    id: string = ""
}
class AccountMutation extends Mutation<AccountState> {
    setId(value) {
        this.state.id = value;
    }
}

export const room = new Room<AccountState, AccountMutation>({
    state: AccountState,
    mutation: AccountMutation
})
// room.set("state");

export default room;