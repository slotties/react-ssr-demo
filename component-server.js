require( "babel-register" )( {
    presets: [ "env" ],
    plugins: [
        [
            "css-modules-transform",
            {
                camelCase: true,
                extensions: [ ".css", ".scss" ],
            },
        ],
        "dynamic-import-node",
    ],
} );

const hypernova = require('hypernova/server');
const hypernovaReact = require('hypernova-react');
const components = require('./src/elements/all');

hypernova({
    devMode: true,

    getComponent(name, context) {
        const component = components[name];
        if (component) {
            context.returnMeta = {
                redirect: true
            };
            return hypernovaReact.renderReact(name, component);
        }

        return null;
    },

    port: 8182,
});
