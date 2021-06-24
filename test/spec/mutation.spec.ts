import { store } from "../src";
import { expect } from "chai";

describe("State value", () => {
    it("set in root state", () => {
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
        store.set("setIsAuthenticated", true);
        expect(store.get("isAuthenticated")).equal(true);

        store.set("setIsConfigLoaded", true);
        expect(store.get("isConfigLoaded")).equal(true);

        return promise;
    })

    it("set in moduled state", () => {
        store.set("setId@account", 5);
        expect(
            store.get("id", "account")
        ).equal(5);

        store.set("setFirstName@profile", "ujjwal",);
        expect(
            store.get("firstName", "profile")
        ).equal("ujjwal");
        store.set("setLastName@profile", "gupta");
        expect(
            store.get("lastName", "profile")
        ).equal("gupta");

    })
})