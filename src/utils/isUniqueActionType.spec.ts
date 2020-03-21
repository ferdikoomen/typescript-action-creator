import { isUniqueActionType } from './isUniqueActionType';

describe('isUniqueActionType', () => {
    it('should warn if name is not unique', () => {
        console.error = jest.fn();

        isUniqueActionType('ACTION');
        isUniqueActionType('ACTION');

        expect(console.error).toBeCalled();
    });

    it('should not warn if name is unique', () => {
        console.error = jest.fn();

        isUniqueActionType('ACTION_1');
        isUniqueActionType('ACTION_2');

        expect(console.error).toBeCalledTimes(0);
    });
});
