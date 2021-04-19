import { DerivedList } from "godam";
import { profile } from "./state";

export class ProfileDeriveds extends DerivedList<typeof profile> {
    fullName() {
        return this.get(this.STATE.firstName) +
            this.get(this.STATE.lastName);
    }
}