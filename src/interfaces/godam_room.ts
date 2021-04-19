export interface IGodamRoom {
    do(taskName: string, payload?: any);
    commit(mutationName: string, payload?: any)
    get(name: string, moduleName?: string)
    derive(name: string)

    STATE;
    MUTATION;
    DERIVED;
    TASK;
}