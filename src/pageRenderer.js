const React = require("react");
const reactDomServer = require("react-dom/server");

const componentMappings = require('./elements/all');

function injectComponents(item, componentResponses) {
    const component = componentMappings[item.type];
    if (componentResponses[item.type]) {
        item.html = componentResponses[item.type].html;
    } else if (component) {
        item.component = component;
    }

    if (item.children) {
        item.children.forEach((child) => injectComponents(child, componentResponses));
    }
}

function render(pageStructure, componentResponses) {
    injectComponents(pageStructure, componentResponses);
    const FrameTemplate = pageStructure.component;
    
    const jsx = ( <FrameTemplate item={pageStructure}/> );

    return reactDomServer.renderToString(jsx);
};
  
module.exports.render = render;