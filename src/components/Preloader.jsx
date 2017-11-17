import React from "react";

require("./Preloader.scss");

// Error
// Warning
// Success


class Preloader extends React.Component {
    render() {      
        return <div className="Preloader">
                <div className="sk-folding-cube Preloader--element">
                  <div className="sk-cube1 sk-cube"></div>
                  <div className="sk-cube2 sk-cube"></div>
                  <div className="sk-cube4 sk-cube"></div>
                  <div className="sk-cube3 sk-cube"></div>
                </div>
              </div>
          
    }
}

export default Preloader;