import React from "react";
import { connect } from 'react-redux';

import Card from "./Card";
import Header from "./Header";
import Table from "./Table";
import NoItems from "./NoItems";
import AuthorCard from "./AuthorCard";
import {Link} from 'react-router-dom';
import Alert from "./Alert";
import Preloader from "./Preloader";

import { getCards, getCardsByType } from '../actions/cards';
import { getLangVars } from '../actions/language';


import {langArrayHandler, convertDate} from '../utilities';

class ResearchMain extends React.Component {
    componentDidMount() {
      this.props.onGetCardsByType('Tender');
      this.props.onLoadLang(this.props.defaultLang);
    }
    render() {
      
      document.title = 'SciTech - ' + this.props.lang.TENDER;

      let cards = <NoItems/>;
      let cardData = this.props.cards;
      
      if(cardData.length != 0) {
        let tableData = {
          fields: ['Название', 'Дедлайн', 'Награда', 'Сфера', 'Компания' ],
          items: []
        };

        tableData.items = cardData.map((card, index) => {
          
          
          let cardLink = <Link to={'/' + card.type + '/' + card._id}>{langArrayHandler(card.name, this.props.defaultLang)}</Link>;

          return [
            cardLink,  
            convertDate(card.tenderDeadline), 
            card.tenderReward,
            card.sphere.map((item)=> this.props.lang[item]).join(', '),
            langArrayHandler(card._author[0] ? card._author[0].name : undefined, this.props.defaultLang)
          ];
          
        });

        cards = <Table data={tableData}/>;
      
      }

      
      return <div className="main-content">
              {this.props.alert.length != 0 ? <Alert type={this.props.alert.type} text={this.props.alert.text}/> : null}
              {this.props.preloader ? <Preloader /> : null }
              <div className="layout-navbar" >
                  <Header/>
              </div>
              
              <div className="layout-container layout-container--white noPadding layout-tenders">
                {cards}
              </div>
              <div className="clearfix"></div>
            </div>

    }
}

export default connect(
  (state, ownProps) => ({
    preloader: state.preloader,
    alert: state.alert,
    cards: state.cards,
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
    }
  })
)(ResearchMain);
