import { Tasks } from "godam";
import { ProfileMutation } from "./mutation";
import { assert } from "chai";
import { ProfileExpression } from "./expression";

export class ProfileTask extends Tasks<ProfileTask, ProfileMutation, ProfileExpression> {
    saveProfile({ firstName, lastName }) {
        this.commit(this.MUTATION.setFirstName, firstName);
        this.commit(this.MUTATION.setLastName, lastName);
        this.commit("saveCache@root", "save_profile");
        const fullName = this.eval(this.EXPRESSION.fullName);
        console.log("fullName", fullName);
        assert(fullName === `${firstName}${lastName}`, "fullName expression not as expected")
    }
}