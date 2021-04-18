import { Tasks } from "godam";
import { RootState } from "./state";
import { RootMutation } from "./mutation";

export class RootTask extends Tasks<RootState, RootMutation> {
    getConfig(isAuthenticated) {
        const isConfigLoaded = this.state(this.STATE.isConfigLoaded);
        if (!isConfigLoaded) {
            this.commit(this.MUTATION.setIsConfigLoaded, true);
            this.commit(this.MUTATION.setIsAuthenticated, isAuthenticated);
        }
    }
}