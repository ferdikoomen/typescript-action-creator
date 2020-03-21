import { ActionWithPayload } from './ActionWithPayload';

type UnpackedReturnType<T extends (...args: any[]) => any> = ReturnType<T> extends Promise<infer U> ? U : ReturnType<T>;

export type ActionCreatorWithPayload<T extends (...args: any[]) => any> = (...args: Parameters<T>) => ActionWithPayload<UnpackedReturnType<T>>;
