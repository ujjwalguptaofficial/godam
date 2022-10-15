import { Expression, computed } from "godam";
import { RootState } from "./state";

export class RootExpression extends Expression<RootState> {
    isCached(key: string) {
        return this.get("cache")[key];
    }


    @computed("errMessage")
    get rootError() {
        return this.get("errMessage");
    }

    @computed("errMessage")
    errorWithoutGet() {
        return this.get("errMessage");
    }

    withObjectPayload(payload) {
        payload.fruit = "mango";
        return payload;
    }

    @computed("errMessage")
    isError() {
        return this.get("errMessage") != null;
    }
}