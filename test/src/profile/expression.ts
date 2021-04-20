import { Expressions } from "godam";
import { profile } from "./state";

export class ProfileExpression extends Expressions<typeof profile> {
    fullName() {
        return this.get(this.STATE.firstName) +
            this.get(this.STATE.lastName);
    }
}