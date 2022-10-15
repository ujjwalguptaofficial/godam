// tslint:disable-next-line
const propName = "__computed__"
export const computed = (...args): MethodDecorator => {
    return ((target: any, methodName: string, descriptor: PropertyDescriptor) => {
        if (!target[propName]) {
            target[propName] = {};
        }
        let fn = descriptor.get || descriptor.value;
        if (fn == null) {
            console.error(
                `Can not find method for computed expression ${methodName}`
            );
        }
        target[propName][methodName] = { args, fn: fn };
    });
};
