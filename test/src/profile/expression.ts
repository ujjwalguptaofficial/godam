import { Expression, computed } from "godam";
import { profile } from "./state";

export class ProfileExpression extends Expression<typeof profile> {

    addressTextCounter_ = 0;
    constructor() {
        super();
        this.markComputed("address", 'address');
    }

    addressTextCounter() {
        return this.addressTextCounter_;
    }

    propWithoutGet = 0;

    fullName() {
        return this.get("firstName") +
            this.get("lastName");
    }

    @computed("firstName", "lastName")
    get nameWithText() {
        return `My name is ${this.get("firstName")} ${this.get("lastName")}`;
    }

    // @computed("address")
    get address() {
        ++this.addressTextCounter_;
        return `My address is ${this.get("address")}`;
    }
}