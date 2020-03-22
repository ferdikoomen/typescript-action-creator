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

    it('should create action with different payload types', () => {
        const payload1 = createAction('PAYLOAD_1', (foo: string) => foo);
        const payload2 = createAction('PAYLOAD_2', (foo: string) => ({ foo }));
        const payload3 = createAction('PAYLOAD_3', (foo: string, bar: string) => ({ foo, bar }));
        const payload4 = createAction('PAYLOAD_4', (foo: string, bar: string, optional?: string) => ({
            foo,
            bar,
            optional,
        }));
        const payload5 = createAction('PAYLOAD_5', (foo: number) => foo);
        const payload6 = createAction('PAYLOAD_6', (foo: number) => ({ foo }));
        const payload7 = createAction('PAYLOAD_7', (foo: number, bar: number) => ({ foo, bar }));
        const payload8 = createAction('PAYLOAD_8', (foo: number, bar: number, optional?: string) => ({
            foo,
            bar,
            optional,
        }));
        const payload9 = createAction('PAYLOAD_9', (obj: any) => obj);
        const payload10 = createAction('PAYLOAD_10', (obj: any) => ({ obj }));
        const payload11 = createAction('PAYLOAD_11', (method: () => any) => method);
        const payload12 = createAction('PAYLOAD_12', (method: () => any) => ({ method }));
        const payload13 = createAction('PAYLOAD_13', (payload?: any) => payload);

        const obj = {
            firstName: 'John',
            lastName: 'Doe',
            age: '45',
            addresses: [
                {
                    street: 'Main Street',
                    city: 'New York',
                },
            ],
        };

        const method = jest.fn();

        expect(payload1('hello')).toEqual({ type: 'PAYLOAD_1', payload: 'hello' });
        expect(payload2('hello')).toEqual({ type: 'PAYLOAD_2', payload: { foo: 'hello' } });
        expect(payload3('hello', 'world')).toEqual({ type: 'PAYLOAD_3', payload: { foo: 'hello', bar: 'world' } });
        expect(payload4('hello', 'world')).toEqual({ type: 'PAYLOAD_4', payload: { foo: 'hello', bar: 'world' } });
        expect(payload5(42)).toEqual({ type: 'PAYLOAD_5', payload: 42 });
        expect(payload6(42)).toEqual({ type: 'PAYLOAD_6', payload: { foo: 42 } });
        expect(payload7(42, -1)).toEqual({ type: 'PAYLOAD_7', payload: { foo: 42, bar: -1 } });
        expect(payload8(42, -1)).toEqual({ type: 'PAYLOAD_8', payload: { foo: 42, bar: -1 } });
        expect(payload9(obj)).toEqual({ type: 'PAYLOAD_9', payload: obj });
        expect(payload10(obj)).toEqual({ type: 'PAYLOAD_10', payload: { obj } });
        expect(payload11(method)).toEqual({ type: 'PAYLOAD_11', payload: method });
        expect(payload12(method)).toEqual({ type: 'PAYLOAD_12', payload: { method } });
        expect(payload13()).toEqual({ type: 'PAYLOAD_13' });
        expect(payload13(undefined)).toEqual({ type: 'PAYLOAD_13' });
        expect(payload13(null)).toEqual({ type: 'PAYLOAD_13', payload: null });
        expect(payload13(0)).toEqual({ type: 'PAYLOAD_13', payload: 0 });
        expect(payload13(NaN)).toEqual({ type: 'PAYLOAD_13', payload: NaN });
        expect(payload13(false)).toEqual({ type: 'PAYLOAD_13', payload: false });
        expect(payload13(true)).toEqual({ type: 'PAYLOAD_13', payload: true });
        expect(payload13({})).toEqual({ type: 'PAYLOAD_13', payload: {} });
    });
});
