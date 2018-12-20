import React from 'react';
import renderer from 'react-test-renderer';
import Features from '.';
import { shallow } from 'enzyme';

jest.mock('react-i18next', () => ({
    withNamespaces: () => (Component) => {
        Component.defaultProps = { ...Component.defaultProps, t: (key) => `[translated] ${key}` };
        return Component;
    },
}));

describe('Features component', () => {
    it('tests if the component is rendered properly', () => {
        expect(renderer.create(<Features />).toJSON()).toMatchSnapshot();
    });

    it('tests the component contains a list of features', () => {
        expect(shallow(<Features />).find('ul').length).toEqual(1);
    });
});
