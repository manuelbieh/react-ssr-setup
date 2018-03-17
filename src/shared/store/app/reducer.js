// @flow
import type { ActionT, AppT } from './types';
import { ActionTypes } from './actions';

export const initialState: AppT = Object.freeze({
    locale: 'en-US',
});

export default (state: AppT = initialState, action: ActionT): AppT => {
    const { type, payload = {} } = action;
    return (
        {
            [ActionTypes.SETLOCALE]: {
                ...state,
                locale: payload,
            },
        }[type] || state
    );
};
