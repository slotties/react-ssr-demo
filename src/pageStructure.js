// External elements:
const externalElements = [
    'Foo'
];

// Example page structure
const pageStructure = {
    id: 1,
    type: 'Home',
    children: [
        {
            id: 2,
            type: 'Foo'
        }
    ]
};

// Seitenstruktur ablaufen und Server-Daten ermitteln (nur Beispiel, Bindung an Element fehlt)
function getExternalElements(node, elementsToFetch) {
    if (externalElements.indexOf(node.type) >= 0) {
        // elementsToFetch.push(node.type + ':' + node.id);
        elementsToFetch.push(node.type);
    }

    if (node.children) {
        node.children.forEach((child) => getExternalElements(child, elementsToFetch));
    }

    return elementsToFetch;
};

function analyzePageStructure() {
    return {
        // In real system the page structure is fetch from another server.
        pageStructure: pageStructure,
        externalElements: getExternalElements(pageStructure, [])
    };
}

module.exports.analyzePageStructure = analyzePageStructure;