const prettier = require('prettier');

module.exports = (plop) => {
    const prettierConfig = prettier.resolveConfig.sync(__dirname);
    plop.load('plop-prettier', prettierConfig);

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
        ],
        actions: (answers) => {
            const actions = [
                {
                    type: 'pretty-add',
                    path:
                        './src/shared/components/{{properCase componentName}}/{{properCase componentName}}.tsx',
                    templateFile: './config/plop/component/component.js.plop',
                },
                {
                    type: 'pretty-add',
                    path:
                        './src/shared/components/{{properCase componentName}}/{{properCase componentName}}.test.tsx',
                    templateFile: './config/plop/component/component.test.js.plop',
                },
            ];

            if (answers.connectToRedux) {
                actions.push({
                    type: 'pretty-add',
                    path: './src/shared/components/{{properCase componentName}}/index.ts',
                    templateFile: './config/plop/component/index.connected.js.plop',
                });
            } else {
                actions.push({
                    type: 'pretty-add',
                    path: './src/shared/components/{{properCase componentName}}/index.ts',
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
                    type: 'pretty-add',
                    path: './src/shared/store/{{camelCase reducerName}}/actions.ts',
                    templateFile: './config/plop/reducer/actions.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/shared/store/{{camelCase reducerName}}/actions.test.ts',
                    templateFile: './config/plop/reducer/actions.test.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/shared/store/{{camelCase reducerName}}/reducer.ts',
                    templateFile: './config/plop/reducer/reducer.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/shared/store/{{camelCase reducerName}}/reducer.test.ts',
                    templateFile: './config/plop/reducer/reducer.test.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/shared/store/{{camelCase reducerName}}/selectors.ts',
                    templateFile: './config/plop/reducer/selectors.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/shared/store/{{camelCase reducerName}}/selectors.test.ts',
                    templateFile: './config/plop/reducer/selectors.test.js.plop',
                },
                {
                    type: 'pretty-add',
                    path: './src/shared/store/{{camelCase reducerName}}/types.ts',
                    templateFile: './config/plop/reducer/types.js.plop',
                },
            ];

            return actions;
        },
    });
};
