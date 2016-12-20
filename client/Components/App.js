import React, { PropTypes, Component } from 'react';

import Counter from './Counter';

export default class App extends Component {

    static propTypes = {
        
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Counter />
        );
    }

}