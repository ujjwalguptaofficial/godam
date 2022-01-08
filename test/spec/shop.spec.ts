import { store } from "../src";
import { expect } from "chai";

describe("Expression value", () => {

    it("add products", () => {
        expect(store.eval("productsCount@shop")).equal(0);


        return new Promise((res) => {
            // expect(store.eval("rootError")).equal(null);
            store.watch('expression.productsCount@shop', (newValue, oldValue) => {
                expect(newValue).equal(1);
                expect(oldValue).equal(0);
                expect(store.eval("productsCount@shop")).equal(1);
                store.unwatch('expression.productsCount@shop');
                res();
            })
            const value = {
                id: 1,
                name: 'Jeans',
                category: 'cloth',
                total: 50,
                price: 1000
            };
            store.set("addProduct@shop", value);
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
        return new Promise((res) => {
            // expect(store.eval("rootError")).equal(null);
            store.watch('expression.productsCount@shop', (newValue, oldValue) => {
                expect(newValue).equal(0);
                expect(oldValue).equal(1);
                expect(store.eval("productsCount@shop")).equal(0);
                store.unwatch('expression.productsCount@shop');
                res();
            })
            store.set("removeLastProduct@shop");
        });
    });

});