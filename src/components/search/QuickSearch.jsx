import React from "react";
import { connect } from 'react-redux';

require("./QuickSearch.scss");

import SearchField from "./SearchField";
import SearchItem from "./SearchItem";

class QuickSearch extends React.Component {
    render() {
      let searchItems = <SearchItem key={1} data={false}/>;

      if(this.props.searchResult){
        searchItems = this.props.searchResult.map((item, index) => <SearchItem searchWord={this.props.searchTerm} key={index} data={item}/>);;
      }
      
        return <div className="QuickSearch">
        <div className="QuickSearch--results">
            <SearchField />
            {searchItems}
          </div>
          
        </div>
    }
}

export default connect(
  state => ({
    searchResult: state.search,
    searchTerm: state.searchTerm
  }),
  dispatch => ({ })
)(QuickSearch);