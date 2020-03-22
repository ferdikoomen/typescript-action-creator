import { Action } from './Action';

/** @private */
export interface ActionCreator<Type extends string = any> {
    readonly TYPE: Type;

    (): Action<Type>;
}
