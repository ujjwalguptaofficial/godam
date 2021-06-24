import { Tasks } from "godam";
import { ProfileMutation } from "./mutation";
import { assert } from "chai";
import { ProfileExpression } from "./expression";

export class ProfileTask extends Tasks<ProfileTask, ProfileMutation, ProfileExpression> {
    saveProfile({ firstName, lastName }) {
        this.set("setFirstName", firstName);
        this.set("setLastName", lastName);
        this.set("saveCache@root", "save_profile");
        const fullName = this.eval("fullName");
        assert(fullName === `${firstName}${lastName}`, "fullName expression not as expected")
    }
}