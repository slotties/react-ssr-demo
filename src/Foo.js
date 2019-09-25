import React from "react";
import Bar from './Bar';

class Foo extends React.Component {
    render( ) {
        return (
            <div>
                Foo
                <Bar/>
            </div>
        );
    }
}

Foo.fetchServerData = function () {
    return new Promise((resolve, reject) => {
        resolve({
            foo: 'bar'
        });
    });
};

export default Foo;