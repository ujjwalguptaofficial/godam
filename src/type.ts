type GODAM_STATE1<T> = <T1 = any>(name: keyof T, moduleName?: string) => T1
type GODAM_STATE2 = <T1 = any>(name: string, moduleName?: string) => T1
type GODAM_STATE3 = <T1 = any>(name: any, moduleName?: string) => T1

export type GODAM_STATE<T> = GODAM_STATE1<T> | GODAM_STATE2 | GODAM_STATE3;

type GODAM_TASK1<T> = <T1 = any>(taskName: keyof T, payload?: any) => T1
type GODAM_TASK2 = <T1 = any>(taskName: string, payload?: any) => T1
type GODAM_TASK3 = <T1 = any>(name: any, moduleName?: string) => T1

export type GODAM_TASK<T> = GODAM_TASK1<T> | GODAM_TASK2 | GODAM_TASK3;

type GODAM_EVAL1<T> = <T1 = any>(name: keyof T, payload?: any) => T1
type GODAM_EVAL2 = <T1 = any>(name: string, payload?: any) => T1
type GODAM_EVAL3 = <T1 = any>(name: any, payload?: any) => T1

export type GODAM_EVAL<T> = GODAM_EVAL1<T> | GODAM_EVAL2 | GODAM_EVAL3;
