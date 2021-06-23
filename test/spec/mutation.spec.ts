import { store } from "../src";
import { expect } from "chai";

describe("State value", () => {
    it("commit in root state", () => {
        const promise = new Promise<void>((res) => {
            store.watch("isAuthenticated", (newValue, oldValue) => {
                expect(newValue).equal(true);
                expect(oldValue).equal(false);
            });
            store.watch("isConfigLoaded", (newValue, oldValue) => {
                expect(newValue).equal(true);
                expect(oldValue).equal(false);

                store.unwatch("isAuthenticated");
                store.unwatch("isConfigLoaded");
                res();
            });
        })
        store.commit("setIsAuthenticated", true);
        expect(store.get("isAuthenticated")).equal(true);

        store.commit("setIsConfigLoaded", true);
        expect(store.get("isConfigLoaded")).equal(true);

        return promise;
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