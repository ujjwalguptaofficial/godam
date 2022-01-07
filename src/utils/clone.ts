import deepClone from "just-clone";
export const clone = (payload) => {
    return typeof payload === "object" ? deepClone(payload) : payload;
}