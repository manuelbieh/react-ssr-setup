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
            <Link to="/counter-1">Counter 1</Link> | <Link to="/counter-2">Counter 2</Link>
            { children }
        </div>
    );
};

Layout.propTypes = {
    children: React.PropTypes.number.isRequired
};

export default function App() {
    return (
        <Router history={ browserHistory }>
            <Route path="/" component={ Layout }>
                <Route path="counter-1" component={ Counter } />
                <Route path="counter-2" component={ AnotherRoute } />
            </Route>
        </Router>
    );
}
