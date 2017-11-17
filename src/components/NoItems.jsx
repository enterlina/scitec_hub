import React from "react";

require("./NoItems.scss");

// Error
// Warning
// Success


class NoItems extends React.Component {
    render() {      
        return <div className="NoItems">
                <h2>There are no items</h2>
              </div>
          
    }
}

export default NoItems;