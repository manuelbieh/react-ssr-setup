module.exports = function(plop) {
    plop.setGenerator('React Component', {
        description: 'Create a new React component',
        prompts: [
            {
                type: 'prompt',
                name: 'componentName',
                message: 'Name of your component:',
            },
            {
                type: 'confirm',
                name: 'connectToRedux',
                message: 'Do you want the component to be connected to Redux?',
                default: true,
            },
            {
                type: 'confirm',
                name: 'useFlow',
                message: 'Do you want Flow to be added to your component?',
                default: true,
            },
        ],
        actions: (answers) => {
            const actions = [
                {
                    type: 'add',
                    path:
                        './src/shared/components/{{properCase componentName}}/{{properCase componentName}}.js',
                    templateFile: './config/plop/component/component.js.plop',
                },
                {
                    type: 'add',
                    path:
                        './src/shared/components/{{properCase componentName}}/{{properCase componentName}}.test.js',
                    templateFile: './config/plop/component/component.test.js.plop',
                },
            ];

            if (answers.connectToRedux) {
                actions.push({
                    type: 'add',
                    path: './src/shared/components/{{properCase componentName}}/index.js',
                    templateFile: './config/plop/component/index.connected.js.plop',
                });
            } else {
                actions.push({
                    type: 'add',
                    path: './src/shared/components/{{properCase componentName}}/index.js',
                    templateFile: './config/plop/component/index.unconnected.js.plop',
                });
            }

            return actions;
        },
    });

    plop.setGenerator('Redux Reducer', {
        description: 'Generate a new Redux reducer (reducer, actions, selectors …)',
        prompts: [
            {
                type: 'prompt',
                name: 'reducerName',
                message: 'Name of your reducer (e.g. "Calendar Event" or "Vehicle")',
            },
        ],
        actions: () => {
            const actions = [
                {
                    type: 'add',
                    path: './src/shared/store/{{camelCase reducerName}}/actions.js',
                    templateFile: './config/plop/reducer/actions.js.plop',
                },
                {
                    type: 'add',
                    path: './src/shared/store/{{camelCase reducerName}}/actions.test.js',
                    templateFile: './config/plop/reducer/actions.test.js.plop',
                },
                {
                    type: 'add',
                    path: './src/shared/store/{{camelCase reducerName}}/reducer.js',
                    templateFile: './config/plop/reducer/reducer.js.plop',
                },
                {
                    type: 'add',
                    path: './src/shared/store/{{camelCase reducerName}}/reducer.test.js',
                    templateFile: './config/plop/reducer/reducer.test.js.plop',
                },
                {
                    type: 'add',
                    path: './src/shared/store/{{camelCase reducerName}}/selectors.js',
                    templateFile: './config/plop/reducer/selectors.js.plop',
                },
                {
                    type: 'add',
                    path: './src/shared/store/{{camelCase reducerName}}/selectors.test.js',
                    templateFile: './config/plop/reducer/selectors.test.js.plop',
                },
                {
                    type: 'add',
                    path: './src/shared/store/{{camelCase reducerName}}/types.js',
                    templateFile: './config/plop/reducer/types.js.plop',
                },
            ];

            return actions;
        },
    });
};
