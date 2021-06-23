import { Expressions } from "godam";
import { profile } from "./state";

export class ProfileExpression extends Expressions<typeof profile> {
    fullName() {
        return this.get("firstName") +
            this.get("lastName");
    }
}