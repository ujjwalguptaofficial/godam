import { promiseResolve } from "../utils";

export class EventBus {

    constructor(ctx?) {
        this._ctx = ctx;
    }

    private _ctx;

    private _events: {
        [key: string]: Map<Function, boolean>
    } = {};

    on(event: string, cb: Function) {
        let events = this._events[event];
        if (events == null) {
            events = this._events[event] = new Map();
        }

        events.set(cb, true);
        return cb;
    }

    once(event: string, cb: Function) {
        const onceCb = (...params) => {
            cb(...params);
            this.off(event, onceCb);
        };
        this.on(event, onceCb);
        return this;
    }

    off(event: string, eventListener: Function) {
        if (process.env.NODE_ENV !== 'production') {
            if (!eventListener) {
                throw new Error(
                    `no event listener is provided in event bus 'off' for event ${event}`
                );
            }
        }
        const events = this._events[event];
        if (events) {
            if (process.env.NODE_ENV !== 'production') {
                if (!events.has(eventListener)) {
                    throw new Error(
                        `supplied event listener is not found for event '${event}'. Please provide same method which was used to subscribe the event.`
                    );
                }
            }
            events.delete(eventListener);
        }
        else if (process.env.NODE_ENV !== 'production') {
            throw new Error(
                `supplied event listener is not found for event '${event}'. Please provide same method which was used to subscribe the event.`
            );
        }
    }

    eachEvent(events: Map<Function, any>, cb) {
        const size = events.size;
        let index = 0;
        events.forEach((_, listener) => {
            if (index++ < size) {
                cb(listener);
            }
        });
    }

    emit(event: string, ...args) {
        const events = this.getEvent(event);
        if (!events) return promiseResolve<any[]>([]);
        const promises = [];
        this.eachEvent(events, (cb) => {
            const result = cb.call(this._ctx, ...args);
            promises.push(result);
        });
        return Promise.all(
            promises
        );
    }

    emitSync(event: string, ...args) {
        const events = this.getEvent(event);
        if (!events) return;
        const results = [];
        this.eachEvent(events, (cb) => {
            const result = cb.call(this._ctx, ...args);
            results.push(result);
        });
        return results;
    }

    emitLinear(event: string, ...args) {
        const storedEvents = this.getEvent(event);
        if (!storedEvents) return promiseResolve<any[]>([]);
        const events = new Map(storedEvents);
        const results = [];
        const items = events.entries();
        const callMethod = (eventCb) => {
            if (!eventCb) return promiseResolve(null);

            const result = eventCb.call(this._ctx, ...args);
            return result && result.then ? result : promiseResolve(result);

        };

        return new Promise<any[]>((res) => {
            const checkAndCall = () => {
                const eventCb = items.next();
                if (!eventCb.done) {
                    callMethod(eventCb.value[0]).then(result => {
                        results.push(result);
                        checkAndCall();
                    });
                }
                else {
                    res(results);
                }
            };
            checkAndCall();
        });
    }

    getEvent(eventName: string) {
        return this._events[eventName];
    }

    destroy() {
        this._events = null;
        this._ctx = null;
    }
}