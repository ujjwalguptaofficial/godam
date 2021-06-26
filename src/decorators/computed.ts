// tslint:disable-next-line
const propName = "__computed__"
export const Computed = (...args): MethodDecorator => {
    return ((target: any, methodName: string, descriptor: PropertyDescriptor) => {
        if (!target[propName]) {
            target[propName] = {};
        }
        // Object.defineProperty('')
        target[propName][methodName] = { args, fn: descriptor.get };
    });
};