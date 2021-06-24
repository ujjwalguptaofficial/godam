import { Expressions, Computed } from "godam";
import { profile } from "./state";

export class ProfileExpression extends Expressions<typeof profile> {

    nameWithTextCounter_ = 0;

    nameWithTextCounter() {
        return this.nameWithTextCounter_;
    }

    propWithoutGet = 0;
    fullName() {
        return this.get("firstName") +
            this.get("lastName");
    }

    @Computed("firstName", "lastName")
    nameWithText() {
        ++this.nameWithTextCounter_;
        return `My name is ${this.get("firstName")} ${this.get("lastName")}`;
    }
}