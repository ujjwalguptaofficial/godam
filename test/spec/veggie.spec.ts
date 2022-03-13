import { store } from "../src";
import { expect } from "chai";
import { clone } from "godam";

describe("Veggie", () => {
    const checkVeggieValue = (value) => {
        const fruitsFromStore = store.get('items@veggie');
        expect(Object.keys(value)).length(Object.keys(fruitsFromStore).length);
        expect(store.eval('veggieLength@veggie')).equal(Object.keys(value).length);
        expect(store.eval('veggieArray@veggie')).eql(Object.keys(value));
        expect(value).eql(fruitsFromStore);
    }

    it("initialize fruits", () => {

        const promise = new Promise<void>((res) => {
            store.watch("items@veggie", (newValue, oldValue) => {
                expect(newValue).eql(store.get('initialFruits@veggie'));
                expect(oldValue).eql({});
                res();
                store.unwatch("items@veggie");
            });
        })
        store.set('initializeFruits@veggie');
        checkVeggieValue(
            store.get('initialFruits@veggie')
        )
        return promise;
    })

    it("add value", async function () {
        store.set('initializeFruits@veggie');
        const promise = new Promise<void>((res) => {
            store.watch("items.add@veggie", (newValue) => {
                expect(newValue).eql({ value: 'amrud', key: 'amrud' });
                res();
                store.unwatch("items.add@veggie");
            });
        })
        const veggie = clone(store.get('initialFruits@veggie'));
        veggie['amrud'] = 'amrud';

        store.get('items@veggie')['amrud'] = 'amrud';
        checkVeggieValue(veggie);
        return promise;
    })

    it("update value", async function () {
        const promise = new Promise<void>((res) => {
            store.watch("items.update@veggie", (newValue) => {
                expect(newValue).eql({ value: 'Amrud', key: 'amrud' });
                res();
                store.unwatch("items.update@veggie");
            });
        })
        const veggie = clone(store.get('initialFruits@veggie'));
        veggie['amrud'] = 'Amrud';
        store.get('items@veggie')['amrud'] = 'Amrud';
        checkVeggieValue(veggie);
        return promise;
    })

    it("delete value", async function () {
        const promise = new Promise<void>((res) => {
            store.watch("items.delete@veggie", (newValue) => {
                expect(newValue).eql({ key: 'amrud', index: 4 });
                res();
                store.unwatch("items.delete@veggie");
            });
        })
        const veggie = clone(store.get('initialFruits@veggie'));
        delete veggie['amrud'];
        delete store.get('items@veggie')['amrud'];
        checkVeggieValue(veggie);
        return promise;
    })

})