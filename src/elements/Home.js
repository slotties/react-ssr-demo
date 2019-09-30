import React from "react";

class Home extends React.Component {
    render( ) {
        const item = this.props.item;

        return (
            <div>
                Hello World!
                <div>
                {item.children.map(child => {
                    const ChildComponent = child.component;
                    if (ChildComponent) {
                        return <ChildComponent key={child.type} />    
                    } else if (child.html) {
                        const html = {
                            __html: child.html
                        };
                        return <div dangerouslySetInnerHTML={html}></div>;
                    }
                })}
                </div>
            </div>
        );
    }
}
export default Home;