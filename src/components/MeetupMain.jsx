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
      this.props.onGetCardsByType('Meetup');
      this.props.onLoadLang(this.props.defaultLang);
      this.props.setPageTitle(this.props.lang.MEETUP);
    }
    render() {
      

      let cards = <NoItems/>;
      let cardData = this.props.cards;
      if (cardData.length != 0) {  
        cards = cardData.map((card, index) => <Card key={index} cardData={card} lang={this.props.defaultLang} defaultLang={this.props.defaultLang}/>);
      }


      
      return <div className="main-content">
              {this.props.alert.length != 0 ? <Alert type={this.props.alert.type} text={this.props.alert.text}/> : null}
              {this.props.preloader ? <Preloader /> : null }
              <div className="layout-navbar" >
                  <Header/>
              </div>
              <div className="layout-container cards">
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
      dispatch({type: "LANG_VARS", payload: { params: params, isLoader: false}});
    }
  })
)(ResearchMain);
