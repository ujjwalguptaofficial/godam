import { store } from "../src";
import { expect } from "chai";

describe("State value", () => {
    it("check root state", () => {
        expect(store.state(store.STATE.appName)).equal("Godam");
        expect(store.state(store.STATE.isAuthenticated)).equal(false);
        expect(store.state(store.STATE.isConfigLoaded)).equal(false);
        expect(store.state(store.STATE.apiServer)).equal("");
        expect(store.state(store.STATE.errMessage)).equal(null);
    })
})