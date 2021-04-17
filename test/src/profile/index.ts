import { Godam } from "godam";
import { profile } from "./state";
import { ProfileMutation } from "./mutation";

export default new Godam<typeof profile>({
    state: profile,
    mutations: ProfileMutation,
})
