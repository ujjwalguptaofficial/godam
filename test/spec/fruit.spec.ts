import { store } from "../src";
import { expect } from "chai";
import { clone } from "godam";

describe("Fruit", () => {
    const checkFruitValue = (value) => {
        const fruitsFromStore = store.get('items@fruit');
        expect(value).length(fruitsFromStore.length);
        expect(store.eval('fruitsLength@fruit')).equal(value.length);
        expect(value).eql(fruitsFromStore);
    }

    it("initialize fruits", () => {

        const promise = new Promise<void>((res) => {
            store.watch("items@fruit", (newValue, oldValue) => {
                console.log("new value", newValue);
                expect(newValue).eql(store.get('initialFruits@fruit'));
                expect(oldValue).eql([]);
                res();
                store.unwatch("items@fruit");
            });
        })
        store.set('initializeFruits@fruit');
        checkFruitValue(
            store.get('initialFruits@fruit')
        )
        return promise;
    })

    it("splice value by 0,1", async function () {
        store.set('initializeFruits@fruit');
        const promise = new Promise<void>((res) => {
            store.watch("items.splice@fruit", (newValue) => {
                expect(newValue).eql([0, 1]);
                res();
                store.unwatch("items.splice@fruit");
            });
        })
        store.get('items@fruit').splice(0, 1);
        const fruits = clone(store.get('initialFruits@fruit'));
        fruits.splice(0, 1);
        checkFruitValue(fruits);
        return promise;
    })

    it("splice value by 2,1", async function () {
        store.set('initializeFruits@fruit');
        const promise = new Promise<void>((res) => {
            store.watch("items.splice@fruit", (newValue) => {
                expect(newValue).eql([2, 1]);
                res();
                store.unwatch("items.splice@fruit");
            });
        })
        store.get('items@fruit').splice(2, 1);
        const fruits = clone(store.get('initialFruits@fruit'));
        fruits.splice(2, 1);
        checkFruitValue(fruits);
        return promise;
    })

    it('splice value by 2,2,"Lemon", "Kiwi" ', async function () {
        store.set('initializeFruits@fruit');
        const promise = new Promise<void>((res) => {
            store.watch("items.splice@fruit", (newValue) => {
                expect(newValue).eql([2, 2, "Lemon", "Kiwi"]);
                res();
                store.unwatch("items.splice@fruit");
            });
        })
        store.get('items@fruit').splice(2, 2, "Lemon", "Kiwi");
        const fruits = clone(store.get('initialFruits@fruit'));
        fruits.splice(2, 2, "Lemon", "Kiwi");
        checkFruitValue(fruits);
        return promise;
    })

    it('pop', async function () {
        store.set('initializeFruits@fruit');
        const promise = new Promise<void>((res) => {
            store.watch("items.pop@fruit", (newValue) => {
                expect(newValue).eql([]);
                res();
                store.unwatch("items.pop@fruit");
            });
        })
        store.get('items@fruit').pop();
        const fruits = clone(store.get('initialFruits@fruit'));
        fruits.pop();
        checkFruitValue(fruits);
        return promise;
    })

    it('shift', async function () {
        store.set('initializeFruits@fruit');
        const promise = new Promise<void>((res) => {
            store.watch("items.shift@fruit", (newValue) => {
                expect(newValue).eql([]);
                res();
                store.unwatch("items.shift@fruit");
            });
        })
        store.get('items@fruit').shift();
        const fruits = clone(store.get('initialFruits@fruit'));
        fruits.shift();
        checkFruitValue(fruits);
        return promise;
    })

    it('unshift', async function () {
        store.set('initializeFruits@fruit');
        const promise = new Promise<void>((res) => {
            store.watch("items.unshift@fruit", (newValue) => {
                expect(newValue).eql(['amrud']);
                res();
                store.unwatch("items.unshift@fruit");
            });
        })
        store.get('items@fruit').unshift('amrud');
        const fruits = clone(store.get('initialFruits@fruit'));
        fruits.unshift('amrud')
        debugger;
        checkFruitValue(fruits);
        return promise;
    })

    it('reverse', async function () {
        store.set('initializeFruits@fruit');
        const promise = new Promise<void>((res) => {
            store.watch("items.reverse@fruit", (newValue) => {
                expect(newValue).eql([]);
                res();
                store.unwatch("items.reverse@fruit");
            });
        })
        store.get('items@fruit').reverse();
        const fruits = clone(store.get('initialFruits@fruit'));
        fruits.reverse();
        checkFruitValue(fruits);
        return promise;
    })
})