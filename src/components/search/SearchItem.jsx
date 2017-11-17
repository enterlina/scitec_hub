import React from "react";
import {substrName, getHighlightedText, langArrayHandler} from '../../utilities';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

require("!style-loader!css-loader!sass-loader!./SearchItem.scss");

// Example of data 

// {
//   type: "Startup",
//   name: "Характеристика взаимодействия наночастиц коллоидного золота.",
//   sphere: "Медицина",
//   _author: {
//     name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//     descr: "химик, институт неорганической химии"
//   }
// }

class SearchItem extends React.Component {
    render() {
      const currentLang = this.props.currentLang;
      const item = this.props.data;
      const searchWord = this.props.searchWord;
      if(item) {
        const markerClass = "icon-marker-" + item.type.toLowerCase();
        let name = substrName(langArrayHandler(item.name, currentLang), 80);
        return <article className="SearchItem">
          <i className={markerClass}></i>
          { item.image ? <img src={item.image} alt={name} title={name} /> : null }
          <div className="SearchItem--content">
            <p>{langArrayHandler(item.sphere, currentLang)}</p>
            <h1><Link to={item.type + '/' + item._id}>{getHighlightedText(name, searchWord)}</Link></h1>
            <p>{langArrayHandler(item._author[0].name, currentLang).toLowerCase()}</p>
          </div>
      </article>
      }
      return <article className="SearchItem">
          <div className="SearchItem--content noResult">
            <h1>{this.props.lang.NO_ITEMS_FOUND || 'There are no items found'}</h1>
          </div>
      </article>
      
    }
}

export default connect(
  state => ({ 
    lang: state.lang,
    currentLang: state.defaultLang
   }),
  dispatch => ({})
)(SearchItem);