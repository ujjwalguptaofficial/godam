import { Tasks } from "godam";
import { RootState } from "./state";
import { RootMutation } from "./mutation";

export class RootTask extends Tasks<RootState, RootMutation> {
    getConfig(isAuthenticated) {
        const isConfigLoaded = this.get("isConfigLoaded");
        if (!isConfigLoaded) {
            this.commit("setIsConfigLoaded", true);
            this.commit("setIsAuthenticated", isAuthenticated);
        }
    }
}