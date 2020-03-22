import { ActionCreator } from '../interfaces/ActionCreator';
import { ActionCreatorWithPayload } from '../interfaces/ActionCreatorWithPayload';
import { isUniqueActionType } from './isUniqueActionType';

/**
 * The create action method lets you create ActionsCreators in simple
 * single line statements, for example:
 *
 * <code>
 *     const setLoading = createAction('SET_LOADING');
 *     const setStatus = createAction('SET_STATUS', (status: string) => ({ status }));
 *     const fetchItem = createAction('FETCH_ITEM', async (id: string) => {
 *         return await Service.fetch(id);
 *     });
 *
 *     dispatch(setLoading());
 *     dispatch(setStatus('loading'));
 *     dispatch(fetchItem('1234'));
 * </code>
 */
export function createAction<Type extends string>(type: Type): ActionCreator<Type>;
export function createAction<Type extends string, T extends (...args: any[]) => any>(type: Type, payloadCreator: T): ActionCreatorWithPayload<Type, T>;
export function createAction<Type extends string, T extends (...args: any[]) => any>(type: Type, payloadCreator?: T): ActionCreatorWithPayload<Type, T> {
    isUniqueActionType(type);

    const actionCreator = (...args: Parameters<T>) => ({
        type,
        payload: payloadCreator?.(...args),
    });

    return Object.assign(actionCreator, {
        TYPE: type,
    }) as ActionCreatorWithPayload<Type, T>;
}
