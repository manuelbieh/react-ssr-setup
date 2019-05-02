import { produce } from 'immer';
import { ActionTypes } from './actions';

type GenericActionT = { type: string; payload: any };

type ActionT = GenericActionT;

type LocaleT = 'en_US' | 'de_DE';

type AppT = {
    locale: LocaleT;
};

export const initialState = Object.freeze<AppT>({
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
