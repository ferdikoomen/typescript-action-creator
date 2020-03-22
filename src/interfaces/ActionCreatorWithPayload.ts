import { ActionWithPayload } from './ActionWithPayload';

type UnpackedReturnType<T extends (...args: any[]) => any> = ReturnType<T> extends Promise<infer U> ? U : ReturnType<T>;

/** @private */
export interface ActionCreatorWithPayload<Type extends string = any, T extends (...args: any[]) => any = any> {
    readonly TYPE: Type;

    (...args: Parameters<T>): ActionWithPayload<Type, UnpackedReturnType<T>>;
}
