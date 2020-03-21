import { createAction } from './createAction';

describe('createAction', () => {
    it('should create action', () => {
        const myAction = createAction('MY_ACTION');

        expect(myAction.TYPE).toEqual('MY_ACTION');

        const action = myAction();

        expect(action).toEqual({
            type: 'MY_ACTION',
        });
    });

    it('should create action with payload', () => {
        const myAction = createAction('MY_ACTION_WITH_PAYLOAD', (foo: string, bar: number) => ({ foo, bar }));

        expect(myAction.TYPE).toEqual('MY_ACTION_WITH_PAYLOAD');

        const action = myAction('Douglas Adams', 42);

        expect(action).toEqual({
            type: 'MY_ACTION_WITH_PAYLOAD',
            payload: {
                foo: 'Douglas Adams',
                bar: 42,
            },
        });
    });

    it('should create action with async payload', async () => {
        const myAction = createAction('MY_ACTION_WITH_ASYNC_PAYLOAD', async (foo: string, bar: number) => {
            return { foo, bar };
        });

        expect(myAction.TYPE).toEqual('MY_ACTION_WITH_ASYNC_PAYLOAD');

        const action = myAction('Douglas Adams', 42);

        expect(action.type).toEqual('MY_ACTION_WITH_ASYNC_PAYLOAD');

        expect(action.payload).toBeInstanceOf(Promise);

        await expect(action.payload).resolves.toEqual({
            foo: 'Douglas Adams',
            bar: 42,
        });
    });
});
