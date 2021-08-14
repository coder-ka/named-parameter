declare type Option = {
    start: string;
    placeholder: (index: number) => string;
};
declare type Result = {
    sql: string;
    params: any[];
};
export declare const replace: (sql: string, params?: Record<string, any> | undefined) => Result;
export declare function createReplace({ start, placeholder, }: Option): (sql: string, params?: Record<string, any>) => Result;
export {};
//# sourceMappingURL=main.d.ts.map