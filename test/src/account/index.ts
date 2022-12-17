import { Godam, Mutation, Room, Task } from "godam";

class AccountState {
    id: string = "";
    isAccountInitialized = false;
}
class AccountMutation extends Mutation<AccountState> {
    setId(value) {
        this.state.id = value;
    }

    isAccountInitialized = this.createMutation('isAccountInitialized');
}

class AccountTask extends Task<AccountState, AccountMutation>{
    initAccount() {
        this.set('isAccountInitialized', true);
    }
}

export const room = new Room<AccountState, AccountMutation>({
    state: AccountState,
    mutation: AccountMutation,
    task: AccountTask
})
// room.set("state");

export default room;