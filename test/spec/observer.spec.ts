import { expect } from "chai";
import { Observer } from "../../src/helpers/observer";

describe('Observer', () => {


    it('simple', (done) => {
        const value = {
            name: 'ujjwal'
        }
        const observer = new Observer((key, newValue, oldValue) => {
            expect(key).equal('name');
            expect(newValue).equal('commander');
            expect(oldValue).equal('ujjwal');
            observer.destroy();
            expect(observer.onChange).to.be.null;
            done();
        });
        const ob = observer.create(value);
        ob.name = 'commander';
    })

    it('nested object', (done) => {
        const value = {
            name: 'ujjwal',
            details: {
                detail1: 'detail1Value'
            }
        }
        let index = 0;
        const observer = new Observer((key, newValue, oldValue) => {
            if (index == 0) {
                expect(key).equal('details.detail1');
                expect(newValue).to.be.undefined;
                expect(oldValue).equal('detail1Value');
            }
            else {
                expect(key).equal('details.detail2');
                expect(newValue).equal('detail2Value');
                expect(oldValue).to.be.undefined;
                observer.destroy();
                expect(observer.onChange).to.be.null;
                done();
            }
            index++;

            // expect(key).equal('detail1');
            // expect(newValue).equal({
            //     detail2: 'detail2'
            // });
            // expect(oldValue).equal({
            //     detail1: 'detail1'
            // });
            // console.log('key', key);
            // console.log('newvalue', newValue);
            // console.log('oldValue', oldValue);

        });
        const ob = observer.create(value);
        ob.details = {
            detail2: 'detail2Value'
        };
    })


})