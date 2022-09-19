// tslint:disable-next-line
const propName = "__computed__"
export const computed = (...args): MethodDecorator => {
    return ((target: any, methodName: string, descriptor: PropertyDescriptor) => {
        if (!target[propName]) {
            target[propName] = {};
        }
        let fn = descriptor.get;
        if (fn == null) {
            fn = () => {
                return "computed method should be get only";
            }
        }
        target[propName][methodName] = { args, fn: fn };
    });
};
