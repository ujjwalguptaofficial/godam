import { store } from "../src";
import { expect } from "chai";

describe("State value", () => {
    it("check root state", () => {
        expect(store.get("appName")).equal("Godam");
        expect(store.get("isAuthenticated")).equal(false);
        expect(store.get("isConfigLoaded")).equal(false);
        expect(store.get("apiServer")).equal("");
        expect(store.get("errMessage")).equal(null);
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