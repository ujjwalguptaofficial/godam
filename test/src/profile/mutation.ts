import { profile } from "./state";
import { Mutation } from "godam";

export class ProfileMutation extends Mutation<typeof profile> {
    setFirstName = this.createMutation('firstName');
    setLastName(value) {
        this.state.lastName = value;
    }
    setAddress(value) {
        this.state.address = value;
    }
}