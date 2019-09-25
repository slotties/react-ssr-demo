import React from "react";
import { renderToString } from "react-dom/server";

// Globale Registrierung aller genutzten Komponenten. Geht hoffentlich auch dynamischer.
import Home from './Home';
import Foo from './Foo';
import SHome from './SHome';
const components = {
    'Home': Home,
    'Foo': Foo,
    'SHome': SHome
};

// Seitenstruktur
const pageStructure = {
    type: 'Home',
    children: [
        {
            type: 'Foo'
        }
    ],
    componentMapping: components
};

// Seitenstruktur ablaufen und Server-Daten ermitteln (nur Beispiel, Bindung an Element fehlt)
function walkPageStructure (node, promises) {
    const component = components[node.type];
    if (component.fetchServerData) {
        promises.push(component.fetchServerData());
    }

    if (node.children) {
        node.children.forEach((child) => walkPageStructure(child, promises));
    }
};

const serverFetches = [];
walkPageStructure(pageStructure, serverFetches);
Promise.all(serverFetches)
    .then(values => {
        console.log(`Server-Daten: ${JSON.stringify(values)}`);
    });

// Die Root-Komponente die zu rendern ist (bspw. S_Home)
const componentName = 'SHome';
const Component = components[componentName];
const jsx = ( <Component item={pageStructure}/> );

const html = renderToString(jsx);
console.log(html);

