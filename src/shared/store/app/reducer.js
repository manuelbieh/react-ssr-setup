// @flow
import { produce } from 'immer';
import type { ActionT, AppT } from './types';
import { ActionTypes } from './actions';

export const initialState: AppT = Object.freeze({
    locale: 'en_US',
});

export default (state: AppT = initialState, action: ActionT): AppT =>
    produce(state, (draft) => {
        const { type, payload } = action;

        switch (type) {
            case ActionTypes.SETLOCALE: {
                draft.locale = payload;
                return;
            }
        }
    });
