import { Mutation } from "godam";
import { RootState } from "./state";
import { store } from "src";


export class RootMutation extends Mutation<RootState> {
    setIsAuthenticated(value) {
        this.state.isAuthenticated = value;
    }
    setIsConfigLoaded(value) {
        this.state.isConfigLoaded = value;
    }

    reset() {
        Object.assign(this.state, new RootState());
    }

    saveCache(key) {
        this.state.cache[key] = true;
    }

    errMessage(value) {
        this.state.errMessage = value;
    }
}