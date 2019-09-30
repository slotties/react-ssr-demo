import React from "react";
import Bar from './Bar';

class Foo extends React.Component {
    render( ) {
        const name = this.props.name;
        return (
            <div>
                Foo: {name}
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