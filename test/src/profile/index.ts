import { Room } from "godam";
import { profile } from "./state";
import { ProfileMutation } from "./mutation";
import { ProfileTask } from "./task";

export default new Room<typeof profile>({
    state: profile,
    mutations: ProfileMutation,
    tasks: ProfileTask
})
