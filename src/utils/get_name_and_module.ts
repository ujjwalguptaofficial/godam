export const getNameAndModule = (name: string) => {
    const splitName = name.split("@");
    return {
        name: splitName[0],
        moduleName: splitName[1]
    }
}