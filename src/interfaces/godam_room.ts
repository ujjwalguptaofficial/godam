export interface IGodamRoom {
    do(taskName: string, payload?: any);
    commit(mutationName: string, payload?: any)
    get(name: string, moduleName?: string)
    eval(name: string)

    STATE;
    MUTATION;
    EXPRESSION;
    TASK;
}