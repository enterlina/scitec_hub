import React from "react";

require("./Alert.scss");

// Error
// Warning
// Success


class Alert extends React.Component {
    render() {
      console.log('alert');
      
        return <div className={"Alert " + this.props.type}>
          {this.props.text}
        </div>;
    }
}

export default Alert;