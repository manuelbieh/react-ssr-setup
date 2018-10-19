import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';

export const displayName = 'hb-button';

const getStyle = (color) => css`
    color: ${color};
`;

export default class Button extends React.Component {
    static propTypes = {
        children: PropTypes.node,
        color: PropTypes.string,
    };
    render() {
        return (
            <button className={`${displayName} ${getStyle(this.props.color)}`}>
                {this.props.children}
            </button>
        );
    }
}
