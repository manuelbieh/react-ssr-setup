// @flow
import type { ActionT, AppT } from './types';
import { ActionTypes } from './actions';

export const initialState: AppT = Object.freeze({
    locale: 'en-US',
});

export default (state: AppT = initialState, action: ActionT): AppT => {
    const { type, payload = {} } = action;

    switch (type) {
        case ActionTypes.SETLOCALE: {
            return {
                ...state,
                locale: payload,
            };
        }
    }

    return state;
};
