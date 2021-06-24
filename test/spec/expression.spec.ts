import { store } from "../src";
import profile from "../src/profile";
import { expect } from "chai";

describe("Expression value", () => {
    it("check propWithoutGet", () => {
        try {
            expect(profile.eval("propWithoutGet")).equal(0);
        } catch (error) {
            expect(error).equal("Expression propWithoutGet is not method.");
        }
    })

    it("check nameWithText", () => {
        expect(profile.eval("nameWithTextCounter")).equal(0);
    })
})