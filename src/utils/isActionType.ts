import { Action } from '../interfaces/Action';
import { ActionCreator } from '../interfaces/ActionCreator';
import { ActionCreatorWithPayload } from '../interfaces/ActionCreatorWithPayload';

/**
 * Check if the given action is the result of an action creator. This allows you to do the following:
 * <code>
 *     const foo = createAction('FOO_ACTION');
 *     const bar = createAction('BAR_ACTION', (id: string) => ({ id }));
 *
 *     const reducer = (state: State, action: Action) => {
 *         if (isAction(action, foo)) {
 *             console.log(action);
 *         }
 *         if (isAction(action, bar)) {
 *             console.log(action.payload.id);
 *         }
 *         return state;
 *     };
 * </code>
 *
 * @param action The action to check
 * @param actionCreator The action creator method to check against
 */
export function isActionType<T extends ActionCreator | ActionCreatorWithPayload<any>>(action: Action, actionCreator: T): action is ReturnType<T> {
    return action.type == actionCreator.TYPE;
}
