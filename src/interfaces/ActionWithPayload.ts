import { Action } from './Action';

export interface ActionWithPayload<Payload = any> extends Action {
    readonly payload: Payload;
}
