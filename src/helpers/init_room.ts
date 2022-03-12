import { Room, Mutation } from "../abstracts";
import { IStore } from "../store";
import { isArray } from "../utils";
import { EventBus } from "./event_bus";
import { Observer } from "./observer";
export function initRoom(this: Room, store: IStore, onWatchBusInit: Function) {

    this['__state__'] = typeof store.state === 'function' ? new store.state() : store.state;

    let mutations = store.mutation || {};
    mutations = typeof mutations === 'function' ? new (store as any).mutation() : mutations;

    this['__mutation__'] = mutations as any;

    let expression = store.expression || {};
    expression = typeof expression === "function" ?
        new (store as any).expression() : expression;
    const get = this.get.bind(this);

    expression['get'] = get;
    this['__expression__'] = expression;

    const task = store.task || {};
    this['__task__'] = typeof task === "function" ? new (task as any)() : task as any;

    Object.assign(this['__task__'], {
        get: get,
        set: this.set.bind(this),
        eval: this.eval.bind(this),
        do: this.do,
    })

    this['__watchBus__'] = new EventBus(this);
    if (onWatchBusInit) {
        onWatchBusInit();
    }
    this['__computed__'] = {};

    let proxyState;

    if (store.track !== false) {
        const expression = this['__expression__'];
        const computed = expression['__computed__'];

        this['__ob__'] = new Observer(this['__onChange__'].bind(this));
        const state = this['__state__'];
        proxyState = this['__ob__'].create(state);

        if (computed) {
            for (const key in computed) {
                const data = computed[key];
                const setComputedValue = () => {
                    // Observer.shouldRegisterChild = false;
                    const oldValue = this['__computed__'][key];
                    this['__computed__'][key] = data.fn.call(expression);
                    // Observer.shouldRegisterChild = true;
                    this['__onChange__'].call(this, `expression.${key}`, this['__computed__'][key], oldValue);
                }
                setComputedValue();
                data.args.forEach(arg => {
                    let toWatch = [arg];
                    if (isArray(state[arg])) {
                        toWatch = toWatch.concat(
                            ['push', 'pop', 'splice', 'shift', 'unshift', 'reverse', 'update'].map(methodName => {
                                return `${arg}.${methodName}`
                            })
                        )
                    }
                    toWatch.forEach(item => {
                        this.watch(item, setComputedValue);
                    });
                })
            }
            // const ob = new Observer((key, newValue, oldValue) => {
            //     this['__onChange__'].call(this, `expression.${key}`, newValue, oldValue);
            // });
            // ob.create(this['__computed__']);
        }
    }
    else {
        proxyState = this['__state__'];
    }
    (mutations as Mutation).state = proxyState;

}