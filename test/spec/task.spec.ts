import { store } from "../src";
import { expect } from "chai";

describe("Action value", () => {
    it("reset root state & check", () => {
        store.commit(store.MUTATION.reset);
        expect(store.state(store.STATE.appName)).equal("Godam");
        expect(store.state(store.STATE.isAuthenticated)).equal(false);
        expect(store.state(store.STATE.isConfigLoaded)).equal(false);
        expect(store.state(store.STATE.apiServer)).equal("");
        expect(store.state(store.STATE.errMessage)).equal(null);
    })

    it("call getConfig", () => {
        store.do("getConfig");
        expect(store.state(store.STATE.isAuthenticated)).equal(undefined);
        expect(store.state(store.STATE.isConfigLoaded)).equal(true);

        store.do("getConfig", true);
        expect(store.state(store.STATE.isAuthenticated)).equal(undefined);
        store.commit(store.MUTATION.reset);
        store.do("getConfig", true);
        expect(store.state(store.STATE.isAuthenticated)).equal(true);
    })
})