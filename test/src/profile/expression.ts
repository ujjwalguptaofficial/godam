import { Expression, Computed } from "godam";
import { profile } from "./state";

export class ProfileExpression extends Expression<typeof profile> {

    addressTextCounter_ = 0;

    addressTextCounter() {
        return this.addressTextCounter_;
    }

    propWithoutGet = 0;

    fullName() {
        return this.get("firstName") +
            this.get("lastName");
    }

    @Computed("firstName", "lastName")
    get nameWithText() {
        return `My name is ${this.get("firstName")} ${this.get("lastName")}`;
    }

    @Computed("address")
    get address() {
        ++this.addressTextCounter_;
        debugger;
        return `My address is ${this.get("address")}`;
    }
}