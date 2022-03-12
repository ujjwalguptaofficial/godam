import { store } from "../src";
import { expect } from "chai";
import { clone } from "godam";

describe("Veggie", () => {
    const checkFruitValue = (value) => {
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
        checkFruitValue(
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
        checkFruitValue(veggie);
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
        checkFruitValue(veggie);
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
        checkFruitValue(veggie);
        return promise;
    })

    // it("splice value by 0,1", async function () {
    //     store.set('initializeFruits@veggie');
    //     const promise = new Promise<void>((res) => {
    //         store.watch("items.splice@veggie", (newValue) => {
    //             expect(newValue).eql([0, 1]);
    //             res();
    //             store.unwatch("items.splice@veggie");
    //         });
    //     })
    //     store.get('items@veggie').splice(0, 1);
    //     const fruits = clone(store.get('initialFruits@veggie'));
    //     fruits.splice(0, 1);
    //     checkFruitValue(fruits);
    //     return promise;
    // })

    // it("splice value by 2,1", async function () {
    //     store.set('initializeFruits@veggie');
    //     const promise = new Promise<void>((res) => {
    //         store.watch("items.splice@veggie", (newValue) => {
    //             expect(newValue).eql([2, 1]);
    //             res();
    //             store.unwatch("items.splice@veggie");
    //         });
    //     })
    //     store.get('items@veggie').splice(2, 1);
    //     const fruits = clone(store.get('initialFruits@veggie'));
    //     fruits.splice(2, 1);
    //     checkFruitValue(fruits);
    //     return promise;
    // })

    // it('splice value by 2,2,"Lemon", "Kiwi" ', async function () {
    //     store.set('initializeFruits@veggie');
    //     const promise = new Promise<void>((res) => {
    //         store.watch("items.splice@veggie", (newValue) => {
    //             expect(newValue).eql([2, 2, "Lemon", "Kiwi"]);
    //             res();
    //             store.unwatch("items.splice@veggie");
    //         });
    //     })
    //     store.get('items@veggie').splice(2, 2, "Lemon", "Kiwi");
    //     const fruits = clone(store.get('initialFruits@veggie'));
    //     fruits.splice(2, 2, "Lemon", "Kiwi");
    //     checkFruitValue(fruits);
    //     return promise;
    // })

    // it('pop', async function () {
    //     store.set('initializeFruits@veggie');
    //     const promise = new Promise<void>((res) => {
    //         store.watch("items.pop@veggie", (newValue) => {
    //             expect(newValue).eql([]);
    //             res();
    //             store.unwatch("items.pop@veggie");
    //         });
    //     })
    //     store.get('items@veggie').pop();
    //     const fruits = clone(store.get('initialFruits@veggie'));
    //     fruits.pop();
    //     checkFruitValue(fruits);
    //     return promise;
    // })

    // it('shift', async function () {
    //     store.set('initializeFruits@veggie');
    //     const promise = new Promise<void>((res) => {
    //         store.watch("items.shift@veggie", (newValue) => {
    //             expect(newValue).eql([]);
    //             res();
    //             store.unwatch("items.shift@veggie");
    //         });
    //     })
    //     store.get('items@veggie').shift();
    //     const fruits = clone(store.get('initialFruits@veggie'));
    //     fruits.shift();
    //     checkFruitValue(fruits);
    //     return promise;
    // })

    // it('unshift', async function () {
    //     store.set('initializeFruits@veggie');
    //     const promise = new Promise<void>((res) => {
    //         store.watch("items.unshift@veggie", (newValue) => {
    //             expect(newValue).eql(['amrud']);
    //             res();
    //             store.unwatch("items.unshift@veggie");
    //         });
    //     })
    //     store.get('items@veggie').unshift('amrud');
    //     const fruits = clone(store.get('initialFruits@veggie'));
    //     fruits.unshift('amrud')
    //     checkFruitValue(fruits);
    //     return promise;
    // })

    // it('reverse', async function () {
    //     store.set('initializeFruits@veggie');
    //     const promise = new Promise<void>((res) => {
    //         store.watch("items.reverse@veggie", (newValue) => {
    //             expect(newValue).eql([]);
    //             res();
    //             store.unwatch("items.reverse@veggie");
    //         });
    //     })
    //     store.get('items@veggie').reverse();
    //     const fruits = clone(store.get('initialFruits@veggie'));
    //     fruits.reverse();
    //     checkFruitValue(fruits);
    //     return promise;
    // })
})