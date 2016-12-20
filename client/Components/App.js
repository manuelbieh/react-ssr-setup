import React from 'react';

import Counter from './Counter';

export default class App extends React.Component {

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