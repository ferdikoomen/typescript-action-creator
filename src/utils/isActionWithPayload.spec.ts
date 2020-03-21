import { createAction } from './createAction';
import { isActionWithPayload } from './isActionWithPayload';

describe('isActionWithPayload', () => {
    it('should return true if action has payload', () => {
        const actionWithPayload = createAction('ACTION_WITH_PAYLOAD', (value: string) => ({ value }));

        const action = actionWithPayload('hello world!');

        expect(isActionWithPayload(action)).toEqual(true);
    });

    it('should return false if action has no payload', () => {
        const actionWithoutPayload = createAction('ACTION_WITHOUT_PAYLOAD');

        const action = actionWithoutPayload();

        expect(isActionWithPayload(action)).toEqual(false);
    });
});
