import { Expression, Computed } from "godam";
import { RootState } from "./state";

export class RootExpression extends Expression<RootState> {
    isCached(key: string) {
        return this.get("cache")[key];
    }


    @Computed("errMessage")
    get rootError() {
        return this.get("errMessage");
    }

    @Computed("errMessage")
    errorWithoutGet() {
        return this.get("errMessage");
    }
}