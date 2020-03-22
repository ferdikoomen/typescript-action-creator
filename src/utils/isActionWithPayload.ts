import { Action } from '../interfaces/Action';
import { ActionWithPayload } from '../interfaces/ActionWithPayload';

/**
 * Check if the action is of type ActionWithPayload.
 * @param action
 */
export function isActionWithPayload<Payload = any>(action: Action): action is ActionWithPayload<typeof action.type, Payload> {
    const { payload } = action as ActionWithPayload<typeof action.type, Payload>;
    return payload !== undefined;
}
