import { Expressions } from "godam";
import { RootState } from "./state";

export class RootExpression extends Expressions<RootState> {
    isCached(key: string) {
        return this.get("cache")[key];
    }
}