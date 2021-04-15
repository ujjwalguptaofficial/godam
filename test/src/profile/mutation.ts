import { profile } from "./state";
import { Mutations } from "godam";

export class ProfileMutation extends Mutations<typeof profile> {
    setFirstName(value) {
        this.state.firstName = value;
    }
}