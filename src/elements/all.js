const fs = require('fs');

// TODO: use async way
const elementNames = fs.readdirSync(__dirname);
const components = {};
elementNames.forEach((elementName) => {
    const elementComponent = require('./' + elementName);
    // only respect es6-exports (workaround, it's too late)
    if (elementComponent.default) {
        const componentName = elementName.replace('.js', '');
        components[componentName] = elementComponent.default;
    }
});

module.exports = components;

