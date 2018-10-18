import React from 'react';

export default function asyncComponent(importComponent) {
    class AsyncComponent extends React.Component {
        state = {
            Component: null,
        };

        async componentDidMount() {
            const { default: Component } = await importComponent();

            this.setComponent(Component);
        }

        componentWillUnmount() {
            this.isPresent = false;
        }

        isPresent = true;

        setComponent = (Component) => {
            this.isPresent &&
                this.setState(() => ({
                    Component,
                }));
        };

        render() {
            const { Component } = this.state;

            return Component ? <Component {...this.props} /> : null;
        }
    }

    return AsyncComponent;
}
