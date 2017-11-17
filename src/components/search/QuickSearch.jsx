import React from "react";
import { connect } from 'react-redux';

require("!style-loader!css-loader!sass-loader!./QuickSearch.scss");

import SearchField from "./SearchField";
import SearchItem from "./SearchItem";

import { search } from '../../actions/search';

class QuickSearch extends React.Component {
    render() {
      let searchItems = <SearchItem data={false}/>;

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
    searchResult: state.search.data,
    searchTerm: state.search.term
  }),
  dispatch => ({ })
)(QuickSearch);