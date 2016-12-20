import React from 'react';

export default class Counter extends React.Component {

    static propTypes = {
        startValue: React.PropTypes.number.isRequired
    };

    static defaultProps = {
        startValue: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            counter: props.startValue || 0
        };
    }

    plus() {
        this.setState({
            counter: this.state.counter+1
        });
    }

    minus() {
        this.setState({
            counter: this.state.counter-1
        });
    }

    render() {
        return (
            <div>
                <p>Counter: { this.state.counter }</p>
                <p>
                    <button onClick={ this.plus.bind(this) }>+</button><br /><br />
                    <button onClick={ this.minus.bind(this) }>–</button>
                </p>
            </div>
        );
    }

}
