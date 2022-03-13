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
            const cb = (newValue, oldValue) => {
                expect(newValue).eql(store.get('initialFruits@fruit'));
                expect(oldValue).eql([]);
                res();
                store.unwatch("items@fruit", cb);
            };
            store.watch("items@fruit", cb);
        })
        store.set('initializeFruits@fruit');
        checkFruitValue(
            store.get('initialFruits@fruit')
        )
        return promise;
    })

    it("push value", async function () {
        store.set('initializeFruits@fruit');
        const promise = new Promise<void>((res) => {
            const cb = (newValue) => {
                expect(newValue).eql(['amrud', 'ddd']);
                res();
                store.unwatch("items.push@fruit", cb);
            };
            store.watch("items.push@fruit", cb);
        })
        store.get('items@fruit').push('amrud', 'ddd');
        const fruits = clone(store.get('initialFruits@fruit'));
        fruits.push('amrud', 'ddd');
        checkFruitValue(fruits);
        return promise;
    })

    it("update value", async function () {
        store.set('initializeFruits@fruit');
        const promise = new Promise<void>((res) => {
            const cb = (newValue) => {
                expect(newValue).eql({ key: 0, value: 'amrud' });
                checkFruitValue(fruits);
                store.unwatch("items.update@fruit", cb);
                res();
            };
            store.watch("items.update@fruit", cb);
        })
        const fruits = clone(store.get('initialFruits@fruit'));
        fruits[0] = 'amrud';
        store.get('items@fruit')[0] = 'amrud';
        return promise;
    })

    it("splice value by 0,1", async function () {
        store.set('initializeFruits@fruit');
        const promise = new Promise<void>((res) => {
            const cb = (newValue) => {
                expect(newValue).eql([0, 1]);
                res();
                store.unwatch("items.splice@fruit", cb);
            };
            store.watch("items.splice@fruit", cb);
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
            const cb = (newValue) => {
                expect(newValue).eql([2, 1]);
                res();
                store.unwatch("items.splice@fruit", cb);
            };
            store.watch("items.splice@fruit", cb);
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
            const cb = (newValue) => {
                expect(newValue).eql([2, 2, "Lemon", "Kiwi"]);
                res();
                store.unwatch("items.splice@fruit", cb);
            };
            store.watch("items.splice@fruit", cb);
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
            const cb = (newValue) => {
                expect(newValue).eql([]);
                res();
                store.unwatch("items.pop@fruit", cb);
            };
            store.watch("items.pop@fruit", cb);
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
            const cb = (newValue) => {
                expect(newValue).eql([]);
                res();
                store.unwatch("items.shift@fruit", cb);
            };
            store.watch("items.shift@fruit", cb);
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
            const cb = (newValue) => {
                expect(newValue).eql(['amrud']);
                res();
                store.unwatch("items.unshift@fruit", cb);
            };
            store.watch("items.unshift@fruit", cb);
        })
        store.get('items@fruit').unshift('amrud');
        const fruits = clone(store.get('initialFruits@fruit'));
        fruits.unshift('amrud')
        checkFruitValue(fruits);
        return promise;
    })

    it('reverse', async function () {
        store.set('initializeFruits@fruit');
        const promise = new Promise<void>((res) => {
            const cb = (newValue) => {
                expect(newValue).eql([]);
                res();
                store.unwatch("items.reverse@fruit", cb);
            };
            store.watch("items.reverse@fruit", cb);
        })
        store.get('items@fruit').reverse();
        const fruits = clone(store.get('initialFruits@fruit'));
        fruits.reverse();
        checkFruitValue(fruits);
        return promise;
    })
})