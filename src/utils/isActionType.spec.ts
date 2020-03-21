import { createAction } from './createAction';
import { isActionType } from './isActionType';

describe('isActionType', () => {
    it('should match action', () => {
        const myAction = createAction('MY_ACTION_TYPE');

        const action = myAction();

        expect(isActionType(action, myAction)).toBeTruthy();
    });

    it('should match action with payload', () => {
        const myAction = createAction('MY_ACTION_TYPE_WITH_PAYLOAD', (foo: string, bar: number) => ({ foo, bar }));

        const action = myAction('Douglas Adams', 42);

        expect(isActionType(action, myAction)).toBeTruthy();
    });

    it('should match action with async payload', async () => {
        const myAction = createAction('MY_ACTION_TYPE_WITH_ASYNC_PAYLOAD', async (foo: string, bar: number) => {
            return { foo, bar };
        });

        const action = myAction('Douglas Adams', 42);

        expect(isActionType(action, myAction)).toBeTruthy();
    });

    it('should not match', async () => {
        const someAction1 = createAction('SOME_ACTION_1');
        const someAction2 = createAction('SOME_ACTION_2');

        const action1 = someAction1();
        const action2 = someAction2();

        expect(isActionType(action1, someAction1)).toBeTruthy();
        expect(isActionType(action2, someAction2)).toBeTruthy();
        expect(isActionType(action1, someAction2)).toBeFalsy();
        expect(isActionType(action2, someAction1)).toBeFalsy();
    });
});
