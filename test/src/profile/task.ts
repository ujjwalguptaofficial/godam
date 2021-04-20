import { Tasks } from "godam";
import { ProfileMutation } from "./mutation";

export class ProfileTask extends Tasks<ProfileTask, ProfileMutation> {
    saveProfile({ firstName, lastName }) {
        this.commit(this.MUTATION.setFirstName, firstName);
        this.commit(this.MUTATION.setLastName, lastName);
        this.commit("saveCache@root", "save_profile");
    }
}