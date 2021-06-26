import { profile } from "./state";
import { Mutations } from "godam";

export class ProfileMutation extends Mutations<typeof profile> {
    setFirstName(value) {
        this.state.firstName = value;
    }
    setLastName(value) {
        this.state.lastName = value;
    }
    setAddress(value) {
        this.state.address = value;
    }
}