import { store } from "../src";
import { expect } from "chai";

describe("State value", () => {
    it("check root state", () => {
        expect(store.state("appName")).equal("Godam");
    })
})