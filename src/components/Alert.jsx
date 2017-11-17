import React from "react";

require("!style-loader!css-loader!sass-loader!./Alert.scss");

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