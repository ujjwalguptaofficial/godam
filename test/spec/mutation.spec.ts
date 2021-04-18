import { store } from "../src";
import { expect } from "chai";

describe("State value", () => {
    it("commit in root state", () => {
        store.commit(store.MUTATION.setIsAuthenticated, true);
        expect(store.state(store.STATE.isAuthenticated)).equal(true);

        store.commit(store.MUTATION.setIsConfigLoaded, true);
        expect(store.state(store.STATE.isConfigLoaded)).equal(true);
    })

    it("commit in moduled state", () => {
        store.commit("setId", 5, "account");
        expect(
            store.state("id", "account")
        ).equal(5);

        store.commit("setFirstName", "ujjwal", "profile");
        expect(
            store.state("firstName", "profile")
        ).equal("ujjwal");
        store.commit("setLastName", "gupta", "profile");
        expect(
            store.state("lastName", "profile")
        ).equal("gupta");

    })
})