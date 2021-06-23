type GODAM_STATE1<T> = (name: keyof T, moduleName?: string) => any
type GODAM_STATE2 = (name: string, moduleName?: string) => any
type GODAM_STATE3 = (name: any, moduleName?: string) => any

export type GODAM_STATE<T> = GODAM_STATE1<T> | GODAM_STATE2 | GODAM_STATE3;

type GODAM_TASK1<T> = (taskName: keyof T, payload?: any) => any
type GODAM_TASK2 = (taskName: string, payload?: any) => any
type GODAM_TASK3 = (name: any, moduleName?: string) => any

export type GODAM_TASK<T> = GODAM_TASK1<T> | GODAM_TASK2 | GODAM_TASK3;

type GODAM_EVAL1<T> = (name: keyof T, payload?: any) => any
type GODAM_EVAL2 = (name: string, payload?: any) => any
type GODAM_EVAL3 = (name: any, payload?: any) => any

export type GODAM_EVAL<T> = GODAM_EVAL1<T> | GODAM_EVAL2 | GODAM_EVAL3;
