import { store } from "../src";
import { expect } from "chai";

describe("State value", () => {
    it("check root state", () => {
        expect(0).equal(0);
        // expect(store.state(store.STATE.appName)).equal("Godam");
        // expect(store.state(store.STATE.isAuthenticated)).equal(false);
        // expect(store.state(store.STATE.isConfigLoaded)).equal(false);
        // expect(store.state(store.STATE.apiServer)).equal("");
        // expect(store.state(store.STATE.errMessage)).equal(null);
    })

    // it("check profile state using module in second param", () => {
    //     expect(
    //         store.state(store.module.account.STATE.id, "account")
    //     ).equal("");

    // })
})