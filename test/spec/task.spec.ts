import { store } from "../src";
import { expect } from "chai";

describe("Task value", () => {
    it("reset root state & check", () => {
        store.set("reset");
        expect(store.get("appName")).equal("Godam");
        expect(store.get("isAuthenticated")).equal(false);
        expect(store.get("isConfigLoaded")).equal(false);
        expect(store.get("apiServer")).equal("");
        expect(store.get("errMessage")).equal(null);
    })

    it('initApp', () => {
        expect(store.get("isAccountInitialized", 'account')).equal(false);
        store.do('initApp');
        expect(store.get("isAccountInitialized", 'account')).equal(true);
    })

    it("call getConfig", () => {
        store.do("getConfig");
        expect(store.get("isAuthenticated")).equal(undefined);
        expect(store.get("isConfigLoaded")).equal(true);

        store.do("getConfig", true);
        expect(store.get("isAuthenticated")).equal(undefined);
        store.set("reset");
        store.do("getConfig", true);
        expect(store.get("isAuthenticated")).equal(true);

    })

    it("save profile", () => {
        store.do("saveProfile@profile", {
            firstName: "BatMan",
            lastName: "SuperMan"
        })
        expect(store.get("firstName@profile")).equal("BatMan");
        expect(store.get("lastName@profile")).equal("SuperMan");
        expect(store.eval("isCached", "save_profile")).equal(true);
    })

    it('call invalid task', () => {
        try {
            store.do("addStudent");
            throw new Error("Should have been error")
        } catch (error) {
            expect(error).equal(`No task exist with name addStudent`);
        }
    })

    it('call invalid task with module', () => {
        try {
            store.do("addStudent@profile");
            throw new Error("Should have been error")
        } catch (error) {
            expect(error).equal(`No task exist with name addStudent & module profile`);
        }
    })

    // it('mutatePayload', () => {
    //     const payload = {
    //         name: 'ujjwal'
    //     }
    //     const result = store.do('mutatePayload', payload);
    //     expect(Object.keys(payload)).deep.equal(['name']);
    //     expect(Object.keys(result)).deep.equal(['name', 'fruit']);
    // })

    it("check for payload methods", () => {

        class Temp {
            name = 'ujjwal';
            getName = function () {
                return this.name;
            }

            protoMethod() {
                return 'protoMethod';
            }
        }

        const payload = new Temp();

        const result = store.do('mutatePayload', payload);
        expect(payload.getName()).equal(result.getName());
        expect(payload.protoMethod()).equal(result.protoMethod());
    })
})