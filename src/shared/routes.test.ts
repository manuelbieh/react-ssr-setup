import { getRoute } from './routes';

const testRoutesConfig = {
    home: '/',
    users: {
        list: '/users',
        view: '/users/:id',
    },
};

describe('routes#getRoute', () => {
    it('should return a simple route', () => {
        expect(getRoute('home', undefined, testRoutesConfig)).toEqual('/');
    });

    it('should return a nested route', () => {
        expect(getRoute('users.list', undefined, testRoutesConfig)).toEqual('/users');
    });

    it('should return a route with its parameters intact if no parameter was given', () => {
        expect(getRoute('users.view', undefined, testRoutesConfig)).toEqual('/users/:id');
    });

    it('should return a route with its parameters replaced', () => {
        expect(getRoute('users.view', { id: 12 }, testRoutesConfig)).toEqual('/users/12');
    });

    it('should return undefined if a route cannot be found', () => {
        expect(getRoute('i.do.not.exist')).toBeUndefined();
    });
});
