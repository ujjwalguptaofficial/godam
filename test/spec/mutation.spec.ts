import { store } from "../src";
import { expect } from "chai";

describe("Mutation", () => {
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

    it('call invalid mutation', () => {
        try {
            store.set("invalid");
            throw new Error("Should have been error")
        } catch (error) {
            expect(error).equal(`No mutation exist with name invalid`);
        }
    })

    it('call invalid mutation with module', () => {
        try {
            store.set("invalid@invalid");
            throw new Error("Should have been error")
        } catch (error) {
            expect(error.message).equal(`no room found - invalid`);
        }
    })

    it('call invalid mutation with module', () => {
        try {
            store.set("invalid@profile");
            throw new Error("Should have been error")
        } catch (error) {
            expect(error).equal(`No mutation exist with name invalid & module profile`);
        }
    })
})