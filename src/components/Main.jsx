import React from "react";
import { connect } from 'react-redux';

import Card from "./Card";
import Header from "./Header";
import Table from "./Table";
import AuthorCard from "./AuthorCard";
import {Link} from 'react-router-dom';
import Alert from "./Alert";
import Preloader from "./Preloader";

import { getLatestCards } from '../actions/cards';
import { getLangVars } from '../actions/language';


import {langArrayHandler} from '../utilities';

class Main extends React.Component {
    componentWillMount() {
      this.props.onLoadLang(this.props.defaultLang);
      this.props.onGetLatestCards();
    }
    componentDidMount() {
      document.title = 'SciTech';
    }
    filterItems(type) {
      let cardData = this.props.cards;
      let filtered = cardData.filter((item)=>{
        return item.type == type;
      });

      let createdCards = this.createCards(filtered);

      return createdCards.length != 0 ? createdCards : false ;
    }
    createCards(cards) {
      return cards.map((card, index) => <Card key={index} cardData={card} lang={this.props.lang} defaultLang={this.props.defaultLang}/>);
    }
    
    render() {
      
      let tenders = this.filterItems('Tender');
      let researches = this.filterItems('Research');
      let startups = this.filterItems('Startup');
      let meetups = this.filterItems('Meetup');
        

      
      return <div className="main-content">
        
              {this.props.alert.length != 0 ? <Alert type={this.props.alert.type} text={this.props.alert.text}/> : null}
              {this.props.preloader ? <Preloader /> : null }

              
              <div className="layout-navbar" >
                  <Header/>
              </div>
              
              { tenders ? <div className="layout-container heading">
                <h2>{this.props.lang.TENDERS}</h2> <Link to="/Tender" className="Button Button--green">{this.props.lang.VIEW_ALL}</Link>
              </div> : null }
              { tenders ? <div className="layout-container cards">
                {tenders}
              </div> : null }


              { researches ? <div className="layout-container heading">
                <h2>{this.props.lang.RESEARCH}</h2> <Link to="/Research" className="Button Button--green">{this.props.lang.VIEW_ALL}</Link>
              </div> : null }
              { researches ? <div className="layout-container cards">
                {researches}
              </div> : null }


               { startups ? <div className="layout-container heading">
                <h2>{this.props.lang.STARTUPS}</h2> <Link to="/Companies" className="Button Button--green">{this.props.lang.VIEW_ALL}</Link>
              </div> : null }
               { startups ? <div className="layout-container cards">
                {startups}
              </div> : null }


               { meetups ? <div className="layout-container heading">
                <h2>{this.props.lang.MEETUPS}</h2> <Link to="/Meetup" className="Button Button--green">{this.props.lang.VIEW_ALL}</Link>
              </div> : null }
              { meetups ? <div className="layout-container cards">
                {meetups}
              </div> : null }
              
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
    onGetLatestCards: () => {
      dispatch(getLatestCards());
    },
    onLoadLang: (lang) => {
      dispatch(getLangVars(lang));
    },
    preLoader: (state) => {
     dispatch({ type: 'ACTION_PRELOADER', payload: state });
    }
  })
)(Main);
