import { Task } from "godam";
import { RootState } from "./state";
import { RootMutation } from "./mutation";

export class RootTask extends Task<RootState, RootMutation> {
    getConfig(isAuthenticated) {
        const isConfigLoaded = this.get("isConfigLoaded");
        if (!isConfigLoaded) {
            this.set("setIsConfigLoaded", true);
            this.set("setIsAuthenticated", isAuthenticated);
        }
    }

    mutatePayload(payload) {
        payload.fruit = "mango";
        return payload;
    }

    initApp() {
        this.do("initAccount@account");
    }
}