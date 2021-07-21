import { Expression } from "godam";
import { RootState } from "./state";

export class RootExpression extends Expression<RootState> {
    isCached(key: string) {
        return this.get("cache")[key];
    }
}