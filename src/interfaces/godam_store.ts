import { Mutation, Task, Expression, Room } from "../abstracts";

export interface IRoomStore {
    state: any;
    mutation?: typeof Mutation | {};
    expression?: typeof Expression | {};
    task?: typeof Task | {};
    track?: boolean;
}

export interface IGodamStore extends IRoomStore {
    rooms?: { [key: string]: Room };
}