import { store } from "../src";
import profile from "../src/profile";
import { expect } from "chai";

describe("Expression value", () => {

    it("check root expression", () => {
        expect(store.eval("rootError")).equal(null);
        const valueToSet = "network issue"
        return new Promise((res) => {
            // expect(store.eval("rootError")).equal(null);
            store.watch('expression.rootError', (newValue, oldValue) => {
                expect(newValue).equal(valueToSet);
                expect(oldValue).equal(null);
                expect(store.eval("rootError")).equal(valueToSet);
                res();
            })
            store.set("errMessage", valueToSet);
        });
    });

    it("computed without get expression", () => {
        expect(store.eval("errorWithoutGet")).equal('Computed method should be get only');
    });


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
                expect(profile.eval("addressTextCounter")).equal(2);
                // setTimeout(res, 500)
            })
            let changeCount = 0;
            const onChange = (key, newValue, oldValue) => {
                if (changeCount == 0) {
                    expect(key).to.equal("address@profile");
                    expect(newValue).equal("Earth");
                    expect(oldValue).equal("India");
                }
                else {
                    expect(key).to.equal("expression.address@profile");
                    expect(newValue).equal("My address is Earth");
                    expect(oldValue).equal("My address is India");
                    setTimeout(() => {
                        store.off('change');
                        res();
                    }, 500)
                }
                ++changeCount;
            };
            store.on('change', onChange);
            profile.set("setAddress", "Earth");
        });
    })

    it('check for shouldCallExpression', () => {
        const fullName = store.eval('fullName@profile');
        expect(fullName).to.be.an('string');
        store.shouldCallExpression = false;
        const fn = store.eval('fullName@profile');
        expect(fn).to.be.an('function');
        expect(fn()).equal(fullName);
        store.shouldCallExpression = true;
    })

    it('mutatePayload', () => {
        const payload = {
            name: 'ujjwal'
        }
        const result = store.eval('withObjectPayload', payload);
        expect(Object.keys(payload)).deep.equal(['name']);
        expect(Object.keys(result)).deep.equal(['name', 'fruit']);
    })

    it('call invalid expression', () => {
        try {
            store.eval("invalidExpression");
            throw new Error("Should have been error")
        } catch (error) {
            expect(error).equal(`No expression exist with name invalidExpression`);
        }
    })

    it('call invalid task with module', () => {
        try {
            store.eval("invalidExpression@profile");
            throw new Error("Should have been error")
        } catch (error) {
            expect(error).equal(`No expression exist with name invalidExpression & module profile`);
        }
    })
})