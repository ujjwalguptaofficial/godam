import { Room } from "godam";
import { profile } from "./state";
import { ProfileMutation } from "./mutation";
import { ProfileTask } from "./task";
import { ProfileExpression } from "./expression";

export default new Room<typeof profile, ProfileMutation, ProfileExpression>({
    state: profile,
    mutation: ProfileMutation,
    task: ProfileTask,
    expression: ProfileExpression
})
