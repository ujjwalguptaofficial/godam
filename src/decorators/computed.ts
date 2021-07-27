// tslint:disable-next-line
const propName = "__computed__"
export const Computed = (...args): MethodDecorator => {
    return ((target: any, methodName: string, descriptor: PropertyDescriptor) => {
        if (!target[propName]) {
            target[propName] = {};
        }
        let fn = descriptor.get;
        if (fn == null) {
            fn = () => {
                return "Computed method should be get only";
            }
        }
        target[propName][methodName] = { args, fn: fn };
    });
};