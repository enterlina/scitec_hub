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


import {langArrayHandler} from '../utilities';

class ResearchMain extends React.Component {
    componentDidMount() {
      this.props.onGetCardsByType('Startup');
      this.props.onGetCompanies();
      this.props.onLoadLang(this.props.defaultLang);
      this.props.setPageTitle(this.props.lang.COMMUNITY);
    }
    sort(key) {
      this.props.sortPeople(key);
    }
    render() {
      

      let cards = <NoItems/>;
      let tableFields =[];
      let filterPeople = this.props.filterPeople;
      let peopleData = filterPeople ? this.props.people.filter(item => item.type == filterPeople) : this.props.people;
      let cardData = this.props.cards;


      

      if(cardData.length != 0){

        if(filterPeople == "Business") {
          tableFields = [this.props.lang.TABLE_COMPANY, this.props.lang.TABLE_SPHERE, this.props.lang.TABLE_VACANCIES];
        } else if(filterPeople == "Accelerator") {
          tableFields = [this.props.lang.TABLE_ACCELERATORS, this.props.lang.TABLE_SPECIALIZATION, this.props.lang.TABLE_SPHERE, this.props.lang.TABLE_VACANCIES];
        } else if(filterPeople == "Fund") {
          tableFields = [this.props.lang.TABLE_FUND, this.props.lang.TABLE_SPHERE];
        } else {
          tableFields = [this.props.lang.TABLE_NAMING, this.props.lang.TABLE_AUTHOR, this.props.lang.TABLE_SPHERE];
        }
      
          let tableData = {
            fields: tableFields,
            items: []
          };


          
          if(filterPeople == "") {
            tableData.items = cardData.map((card, index) => {
              let authors = card._author.map((author, index) => {
                return <AuthorCard data={author} index={index}  lang={this.props.defaultLang} />
              });
              
              let cardLink = <Link to={'/' + card.type + '/' + card._id}>{langArrayHandler(card.name, this.props.defaultLang)}</Link>;

              return [cardLink, authors, card.sphere.map((item)=> this.props.lang[item]).join(', ')];
            });
          } else {
            tableData.items = peopleData.map((card, index) => {

              let author = <AuthorCard data={card}  lang={this.props.defaultLang} />;
              const sphere = card.sphere.map((item)=> this.props.lang[item]).join(', ');
              if(filterPeople == "Accelerator") {
                return [author, langArrayHandler(card.specialization, this.props.defaultLang), sphere, langArrayHandler(card.job, this.props.defaultLang)];
              } else if(filterPeople == "Fund") {
                return [author,  sphere];
              } else if(filterPeople == "Business") {
                return [author, sphere, langArrayHandler(card.job, this.props.defaultLang)];
              } 
            });
          }
          
          cards = <Table data={tableData}/>;
        }

     
  
      
      return <div className="main-content">
              {this.props.alert.length != 0 ? <Alert type={this.props.alert.type} text={this.props.alert.text}/> : null}
              {this.props.preloader ? <Preloader /> : null }
              <div className="layout-navbar" >
                  <Header/>
              </div>
              
              <div className="layout-container layout-container--white noPadding">
              <ul className="SortableFields">
                <li><a href="javascript:void(0);" className={filterPeople == ""  ? 'active-link' : ''} onClick={this.sort.bind(this, '')}>STARTUPs</a></li>
                <li><a href="javascript:void(0);" className={filterPeople == 'Business'  ? 'active-link' : ''} onClick={this.sort.bind(this, 'Business')}>{this.props.lang.TABLE_COMPANY}</a></li>
                <li><a href="javascript:void(0);" className={filterPeople == 'Accelerator'  ? 'active-link' : ''} onClick={this.sort.bind(this, 'Accelerator')}>{this.props.lang.TABLE_ACCELERATORS}</a></li>
                <li><a href="javascript:void(0);" className={filterPeople == 'Fund'  ? 'active-link' : ''} onClick={this.sort.bind(this, 'Fund')}>{this.props.lang.TABLE_FUND}</a></li>
              </ul>

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
    people: state.people,
    filterPeople: state.filterPeople,
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
    onGetCompanies: ()=> {
      
      let params = {
        type: 'companies'
      }
      dispatch({type: "FETCH_PEOPLE", payload: { params: params}});
    },
    onLoadLang: (lang) => {
      let params = {
        type: 'langvars',
        query: lang
      }
      dispatch({type: "LANG_VARS", payload: { params: params, isLoader: false}});
    },
    sortPeople: (field) => {
      dispatch({type: 'SORT_PEOPLE', payload: field});
    }
  })
)(ResearchMain);
