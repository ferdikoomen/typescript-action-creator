export interface Action<Type extends string = any> {
    readonly type: Type;
}
