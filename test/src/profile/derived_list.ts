import { DerivedList } from "godam";
import { profile } from "./state";

export class ProfileDeriveds extends DerivedList<typeof profile> {
    fullName() {
        return this.state(this.STATE.firstName) +
            this.state(this.STATE.lastName);
    }
}