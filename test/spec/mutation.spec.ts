import { store } from "../src";
import { expect } from "chai";

describe("State value", () => {
    it("commit in root state", () => {
        store.commit(store.MUTATION.setIsAuthenticated, true);
        expect(store.get(store.STATE.isAuthenticated)).equal(true);

        store.commit(store.MUTATION.setIsConfigLoaded, true);
        expect(store.get(store.STATE.isConfigLoaded)).equal(true);
    })

    it("commit in moduled state", () => {
        store.commit("setId@account", 5);
        expect(
            store.get("id", "account")
        ).equal(5);

        store.commit("setFirstName@profile", "ujjwal",);
        expect(
            store.get("firstName", "profile")
        ).equal("ujjwal");
        store.commit("setLastName@profile", "gupta");
        expect(
            store.get("lastName", "profile")
        ).equal("gupta");

    })
})