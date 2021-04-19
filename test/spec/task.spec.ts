import { store } from "../src";
import { expect } from "chai";

describe("Action value", () => {
    it("reset root state & check", () => {
        store.commit(store.MUTATION.reset);
        expect(store.get(store.STATE.appName)).equal("Godam");
        expect(store.get(store.STATE.isAuthenticated)).equal(false);
        expect(store.get(store.STATE.isConfigLoaded)).equal(false);
        expect(store.get(store.STATE.apiServer)).equal("");
        expect(store.get(store.STATE.errMessage)).equal(null);
    })

    it("call getConfig", () => {
        store.do("getConfig");
        expect(store.get(store.STATE.isAuthenticated)).equal(undefined);
        expect(store.get(store.STATE.isConfigLoaded)).equal(true);

        store.do("getConfig", true);
        expect(store.get(store.STATE.isAuthenticated)).equal(undefined);
        store.commit(store.MUTATION.reset);
        store.do("getConfig", true);
        expect(store.get(store.STATE.isAuthenticated)).equal(true);
    })
})