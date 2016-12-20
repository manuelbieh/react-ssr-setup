import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import Counter from './Counter';

const AnotherRoute = () => {
    return (
        <Counter startValue={2} />
    );
};

const Layout = ({ children }) => {
    return (
        <div>
            <Link to="/counter-1">Counter 1</Link> | <Link to="/counter-2">Counter 2</Link> | <Link to="/ip">IP</Link>
            { children }
        </div>
    );
};

Layout.propTypes = {
    children: React.PropTypes.node
};


class ShowMyIP extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ip: '???'
        }
    }
    
    componentDidMount() {
        fetch('https://wtfismyip.com/json').then((response) => {
            response.json().then((data) => {
                this.setState({
                    ip: data.YourFuckingIPAddress
                });
            });
        });
    }

    render() {
        return (
            <div>
                { this.state.ip }
            </div>
        )
    }

}


export default function App() {
    return (
        <Router history={ browserHistory }>
            <Route path="/" component={ Layout }>
                <Route path="counter-1" component={ Counter } />
                <Route path="counter-2" component={ AnotherRoute } />
                <Route path="ip" component={ ShowMyIP } />
            </Route>
        </Router>
    );
}
