import { getObjectLength } from "./get_object_length";
import { isObject } from "./is_object";
import { isArray } from "./is_array";

export class Observer {

    onChange: (key: string, newValue, oldValue?) => void;

    constructor(onChange) {
        this.onChange = onChange;
    }

    create(input: object, keys?: string[], prefix = "") {
        const cached = {};
        const onChange = this.onChange;
        if (isArray(input)) {
            keys = keys || ["push", "splice", 'pop'];
            keys.forEach(key => {
                cached[key] = this[key];
                Object.defineProperty(input, key, {
                    value: function (...args) {
                        const result = Array.prototype[key].apply(this, args);
                        onChange(prefix + key, (() => {
                            switch (key) {
                                case 'push':
                                    // return args[0];
                                    return {
                                        value: args[0],
                                        key: result - 1,
                                        length: result
                                    };
                                default:
                                    return args;
                            }
                        })());
                        return result;
                    }
                });
            });
            return;
        }
        keys = keys || Object.keys(input);
        keys.forEach(key => {
            cached[key] = input[key];
            const registerChild = () => {
                if (isObject(input[key])) {
                    this.create(input[key], null, `${prefix}${key}.`);
                }
            };
            Object.defineProperty(input, key, {
                set(newValue) {
                    const oldValue = cached[key];
                    if (oldValue === newValue) return;
                    cached[key] = newValue;

                    onChange(prefix + key, newValue, oldValue);
                    registerChild();
                },
                get() {
                    return cached[key];
                }

            });
            registerChild();
        });

        Object.defineProperty(input, "push", {
            enumerable: false,
            value: function (value, keyToAdd) {
                this[keyToAdd] = value;
                const length = getObjectLength(this);
                onChange(`${prefix}push`, {
                    value: value,
                    key: keyToAdd,
                    length: length
                });
                return length;
            }
        });

        Object.defineProperty(input, "splice", {
            enumerable: false,
            value: (index, noOfItemToDelete) => {
                onChange(`${prefix}splice`, [index, noOfItemToDelete]);
            }
        });

        Object.defineProperty(input, "update", {
            enumerable: false,
            value: function (prop, value) {
                this[prop] = value;
                onChange(`${prefix}update`, [prop, value]);
            }
        });
    }

    destroy() {
        this.onChange = null;
    }
}

