import React from "react";
import { connect } from 'react-redux';

import Card from "./Card";
import NoItems from "./NoItems";
import Header from "./Header";
import Table from "./Table";
import AuthorCard from "./AuthorCard";
import {Link} from 'react-router-dom';
import Alert from "./Alert";
import Preloader from "./Preloader";
import Dropdown from "./Dropdown";

import { getCards, getCardsByType } from '../actions/cards';
import { getLangVars } from '../actions/language';


import {langArrayHandler} from '../utilities';

class ResearchMain extends React.PureComponent {
    componentDidMount() {
      this.props.onGetCardsByType('Research');
      this.props.onLoadLang(this.props.defaultLang);
    }
    render() {
      const filterCards = (item) => {
        let filter = this.props.filter;
        let result = true;
        for(let field in filter){
          let itemField = item[field] ? item[field] : [];
          let filterField = filter[field];

          if(filterField && itemField) { 
            result = result && itemField.some(r=> filterField.indexOf(r) >= 0)
          }
        }
        return result;
      }
      
      document.title = 'SciTech - ' + this.props.lang.RESEARCH;
      let filter = this.props.filter;
      let cards = <NoItems/>;
      let cardData = Array.isArray(this.props.cards) ? this.props.cards : [] ;
      if(filter.length != 0) {
        cardData = cardData.filter(filterCards);
      }
      if(cardData.length !=0) {
        let tableData = {
          fields: [this.props.lang.TABLE_NAMING, this.props.lang.TABLE_AUTHOR, this.props.lang.TABLE_SPHERE],
          items: []
        };

       tableData.items =  cardData.map((card, index) => {
          let authors = card._author.map((author, index) => {
            return <AuthorCard data={author} index={index}  lang={this.props.defaultLang} />
          });
          
          let cardLink = <Link to={'/' + card.type + '/' + card._id}>{langArrayHandler(card.name, this.props.defaultLang)}</Link>;

          return [cardLink, authors, card.sphere.map((item)=> this.props.lang[item]).join(', ')];
        });

        cards = <Table data={tableData}/>;
      }
        

      
      return <div className="main-content">
              {this.props.alert.length != 0 ? <Alert type={this.props.alert.type} text={this.props.alert.text}/> : null}
              {this.props.preloader ? <Preloader /> : null }
              <div className="layout-navbar" >
                  <Header/>
              </div>
              
              <div className="layout-container layout-container--white noPadding">
              <div className="DropdownArea"><Dropdown name="sphere" type="Research"/><Dropdown name="country" type="Research"/></div>
                {cards}
              </div>

              <div className="clearfix"></div>
            </div>

    }
}
const cardsHandler = (state)=>{
  const filters = state.filters.selected;
  if(filters && filters.length != 0){
    return state.cards.filter((item)=>{
        return filters.indexOf(item.sphere) != -1;
    })
  }
  return state.cards;
}
export default connect(
  (state, ownProps) => ({
    preloader: state.preloader,
    alert: state.alert,
    cards: cardsHandler(state),
    filter: state.filters, 
    lang: state.lang,
    defaultLang: state.defaultLang,
    ownProps
  }),
  dispatch => ({
    onGetCardsByType: ( type) => {
      dispatch(getCardsByType(type));
    },
    onLoadLang: (lang) => {
      dispatch(getLangVars(lang));
    },
    preLoader: (state) => {
     dispatch({ type: 'ACTION_PRELOADER', payload: state });
    }
  })
)(ResearchMain);
