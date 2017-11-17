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

import {langArrayHandler, convertDate} from '../utilities';

class ResearchMain extends React.Component {
    componentDidMount() {
      this.props.onGetCardsByType('Tender');
      this.props.onLoadLang(this.props.defaultLang);
      this.props.setPageTitle(this.props.lang.TENDER); 
    }
    render() {
      

      let cards = <NoItems/>;
      let cardData = this.props.cards;
      
      if(cardData.length != 0) {
        let tableData = {
          fields: [this.props.lang.TABLE_NAMING, this.props.lang.TABLE_DEADLINE, this.props.lang.TABLE_REVARD, this.props.lang.TABLE_SPHERE, this.props.lang.TABLE_COMPANY ],
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
    setPageTitle: (title)=>{
      dispatch({type: "SET_PAGE_TITLE", payload: title});
    },
    onGetCardsByType: ( type) => {
      let params = {
        type: 'cards/type',
        query: type
      }
      dispatch({type: "FETCH_CARDS", payload: { params: params}});
    },
    onLoadLang: (lang) => {
      let params = {
        type: 'langvars',
        query: lang
      }
      dispatch({type: "LANG_VARS", payload: {params: params, isLoader: false}});
    }
  })
)(ResearchMain);
