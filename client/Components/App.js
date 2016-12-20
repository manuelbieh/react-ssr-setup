import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router';

import Counter from './Counter';

const AnotherRoute = () => {
    return (
        <div>
            <Counter startValue={2} />
            <Link to="/counter2">Counter 2</Link>
        </div>
    );
};

export default function App() {
    return (
        <Router history={ browserHistory }>
            <Route path="/" component={ AnotherRoute } />
            <Route path="/counter2" component={ Counter } />
        </Router>
    );
}
