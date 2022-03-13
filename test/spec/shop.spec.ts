import { store } from "../src";
import { expect } from "chai";

describe("Shop", () => {

    it("add products", () => {
        expect(store.eval("productsCount@shop")).equal(0);


        return new Promise<void>((res) => {
            const value = {
                id: 1,
                name: 'Jeans',
                category: 'cloth',
                total: 50,
                price: 1000
            };
            const cb = (newValue, oldValue) => {
                expect(newValue).equal(1);
                expect(oldValue).equal(0);
                expect(store.eval("productsCount@shop")).equal(1);
                expect(store.get("products@shop")[0]).eql(value);
                store.unwatch('expression.productsCount@shop', cb);
                res();
            };
            store.watch('expression.productsCount@shop', cb)
            store.set("addProduct@shop", value);
        });
    });

    it("update products", () => {

        return new Promise<void>((res) => {
            // expect(store.eval("rootError")).equal(null);
            const value = {
                id: 1,
                name: 'Shirt',
                category: 'cloth',
                total: 150,
                price: 2000
            };
            const cb = (newValue, oldValue) => {
                expect(newValue).equal(1);
                expect(oldValue).equal(1);
                expect(store.eval("productsCount@shop")).equal(1);
                expect(store.get("products@shop")[0]).eql(value);
                store.unwatch('expression.productsCount@shop', cb);
                res();
            };
            store.watch('expression.productsCount@shop', cb);
            store.set("updateProduct@shop", value);
        });
    });

    it("check for reference", () => {
        const value = {
            id: 1,
            name: 'Jeans',
            category: 'cloth',
            total: 50,
            price: 1000
        };
        store.set("addProduct@shop", value);
        let valueFromStore = store.eval('lastProduct@shop');
        expect(valueFromStore).deep.equal(value);
        value['key'] = 'ujjwal';
        valueFromStore = store.eval('lastProduct@shop');
        expect(valueFromStore).to.not.haveOwnProperty('key', 'ujjwal');
        store.set("removeLastProduct@shop");
    })

    it("rm last products", () => {
        expect(store.eval("productsCount@shop")).equal(1);
        return new Promise<void>((res) => {
            // expect(store.eval("rootError")).equal(null);
            const cb = (newValue, oldValue) => {
                expect(newValue).equal(0);
                expect(oldValue).equal(1);
                expect(store.eval("productsCount@shop")).equal(0);
                store.unwatch('expression.productsCount@shop', cb);
                res();
            };
            store.watch('expression.productsCount@shop', cb)
            store.set("removeLastProduct@shop");
        });
    });

});