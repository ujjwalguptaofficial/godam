import { store } from "../src";
import { expect } from "chai";

describe("State value", () => {
    it("check root state", () => {
        expect(store.get(store.STATE.appName)).equal("Godam");
        expect(store.get(store.STATE.isAuthenticated)).equal(false);
        expect(store.get(store.STATE.isConfigLoaded)).equal(false);
        expect(store.get(store.STATE.apiServer)).equal("");
        expect(store.get(store.STATE.errMessage)).equal(null);
    })

    it("check profile state using module in second param", () => {
        expect(
            store.get("id", "account")
        ).equal("");
        expect(
            store.get("firstName", "profile")
        ).equal("Ujjwal");
        expect(
            store.get("lastName", "profile")
        ).equal("Gupta");

    })
})