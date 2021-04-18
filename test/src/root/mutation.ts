import { Mutations } from "godam";
import { RootState } from "./state";


export class RootMutation extends Mutations<RootState> {
    setIsAuthenticated(value) {
        this.state.isAuthenticated = value;
    }
    setIsConfigLoaded(value) {
        this.state.isConfigLoaded = value;
    }
}