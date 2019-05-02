import { getLocale } from './selectors';
import { initialState } from './reducer';

const state = {
    app: initialState,
};

describe('App Selectors', () => {
    it('gets the locale', () => {
        expect(getLocale(state)).toMatch('en_US');
    });
});
