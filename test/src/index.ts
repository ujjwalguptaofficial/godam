import { RootState } from "./root";
import { Godam } from "godam";
import Profile from "./profile";

export const store = new Godam<RootState>({
    state: RootState
}, {
    profile: Profile
})