import { Action } from './Action';

export interface ActionWithPayload<Type extends string = any, Payload = any> extends Action<Type> {
    readonly payload: Payload;
}
