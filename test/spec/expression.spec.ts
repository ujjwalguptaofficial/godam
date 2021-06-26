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

    it("check address with text", () => {
        expect(profile.eval("addressTextCounter")).equal(1);

        expect(profile.eval("address")).equal("My address is India");
        expect(profile.eval("address")).equal("My address is India");

        expect(profile.eval("addressTextCounter")).equal(1);
        return new Promise((res) => {
            profile.watch('expression.address', (newValue, oldValue) => {
                expect(newValue).equal("My address is Earth");
                expect(oldValue).equal("My address is India");
            })
            store.watch('expression.address@profile', (newValue, oldValue) => {
                expect(newValue).equal("My address is Earth");
                expect(oldValue).equal("My address is India");
                setTimeout(res, 500)
            })
            profile.set("setAddress", "Earth");
        });
    })
})