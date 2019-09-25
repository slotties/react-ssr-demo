import React from "react";

class SHome extends React.Component {
    render( ) {
        const item = this.props.item;

        // SHome hat dynamische Children
        return (
            <div>
                S_Home
                {item.children.map(child => {
                    const ChildComponent = item.componentMapping[child.type];
                    return <ChildComponent key={child.type} />;
                })}
            </div>
        );
    }
}

export default SHome;