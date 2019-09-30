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

const express = require('express');
const Renderer = require('hypernova-client');
const devModePlugin = require('./src/devPlugin');
const pageStructure = require('./src/pageStructure');
const pageRenderer = require('./src/pageRenderer');

const app = express();

const renderer = new Renderer({
    url: 'http://localhost:8182/batch',
    plugins: [
        // Just a input=output plugin because we want to render the components in by embedding them into a frame template.
        {
            afterResponse(res) {
                return res;
            }
        }
    ],
});

app.get('/', (req, res) => {
    // Usually we would provide the URL here to get the page structure.
    const pageData = pageStructure.analyzePageStructure();
    
    console.log(pageData);
    const jobs = {
        'Foo': { name: req.query.name || 'Stranger' }
    };

    renderer.render(jobs).then((responses) => {
        const html = pageRenderer.render(pageData.pageStructure, responses);
        res.send(html);
    });
});

app.listen(8181, () => console.log('Now listening'));