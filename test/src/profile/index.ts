import { Room } from "godam";
import { profile } from "./state";
import { ProfileMutation } from "./mutation";

export default new Room<typeof profile>({
    state: profile,
    mutations: ProfileMutation,
})
