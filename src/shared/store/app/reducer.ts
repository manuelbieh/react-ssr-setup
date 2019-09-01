import { produce } from 'immer';
import { ActionTypes } from './actions';
import { Action, AppState } from './types';

export const initialState = Object.freeze<AppState>({
    locale: 'en_US',
});

export default (state: AppState = initialState, action: Action): AppState =>
    produce(state, (draft) => {
        switch (action.type) {
            case ActionTypes.SETLOCALE: {
                draft.locale = action.payload;
                return;
            }
        }
    });
