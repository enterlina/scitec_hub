import React from "react";
import { connect } from 'react-redux';

require("./SortableFields.scss");

import Header from "./Header";
import Table from "./Table";
import NoItems from "./NoItems";
import AuthorCard from "./AuthorCard";
import {Link} from 'react-router-dom';
import Alert from "./Alert";
import Preloader from "./Preloader";

import {langArrayHandler, getQueryVariable, multipleArrTransformer} from '../utilities';

class ResearchMain extends React.Component {
    componentDidMount() {
      this.props.onGetPeople();
      this.props.onLoadLang(this.props.defaultLang);
      this.props.setPageTitle(this.props.lang.PEOPLE);     
    }
    sortPeoples(field) {
      this.props.sortPeople(field);
    }
    render() {
      let people = <NoItems />;
      let tableFields = [];
      let filterPeople = this.props.filterPeople;
      let peopleData = filterPeople ? this.props.people.filter(item => item.type == filterPeople) : this.props.people;

      if(peopleData.length != 0 ){

        if(filterPeople == "Scientist") {
          tableFields = [this.props.lang.TABLE_SCIENTIST, this.props.lang.TABLE_SPECIALIZATION, this.props.lang.TABLE_SPHERE, this.props.lang.TABLE_PUBLICATIONS_AND_PATENTS];
        } else if(filterPeople == "Startuper") {
          tableFields = [this.props.lang.TABLE_CONTACT, this.props.lang.TABLE_SPECIALIZATION, this.props.lang.TABLE_SPHERE, this.props.lang.TABLE_PROJECTS];
        } else if(filterPeople == "Business") {
          tableFields = [this.props.lang.TABLE_COMPANY, this.props.lang.TABLE_SPHERE, this.props.lang.TABLE_VACANCIES];
        } else {
          tableFields = [this.props.lang.TABLE_NAME_AND_NAMING, this.props.lang.TABLE_TYPE, this.props.lang.TABLE_SPECIALIZATION, this.props.lang.TABLE_SPHERE, this.props.lang.TABLE_WORKS_AND_PUBLICATIONS];
        }
      
          let tableData = {
            fields: tableFields,
            items: []
          };

          tableData.items = peopleData.map((card, index) => {

            let author = <AuthorCard data={card}  lang={this.props.defaultLang} />;
            const sphere = card.sphere.map((item)=> this.props.lang[item]).join(', ');
            if(filterPeople == "Scientist") {
              return [author, langArrayHandler(card.specialization, this.props.defaultLang), sphere, <ul>{multipleArrTransformer(card.publications)}{multipleArrTransformer(card.patents)}</ul>];
            } else if(filterPeople == "Startuper") {
              return [author, langArrayHandler(card.specialization, this.props.defaultLang), sphere, <ul>{multipleArrTransformer(card.projects)}</ul>];
            } else if(filterPeople == "Business") {
              return [author, sphere, langArrayHandler(card.job, this.props.defaultLang)];
            } else {
              return [author, card.type, langArrayHandler(card.specialization, this.props.defaultLang), sphere, <ul>{multipleArrTransformer(card.publications)}{multipleArrTransformer(card.patents)}{multipleArrTransformer(card.projects)}{langArrayHandler(card.job, this.props.defaultLang)}</ul>];
            }

            
          });
          
          people = <Table data={tableData}/>;
        }



      
      return <div className="main-content">
              {this.props.alert.length != 0 ? <Alert type={this.props.alert.type} text={this.props.alert.text}/> : null}
              {this.props.preloader ? <Preloader /> : null }
              <div className="layout-navbar" >
                  <Header/>
              </div>
              
              <div className="layout-container layout-container--white noPadding">
              <ul className="SortableFields">
                <li><a href="javascript:void(0);" className={filterPeople == ""  ? 'active-link' : ''} onClick={this.sortPeoples.bind(this, '')}>Все</a></li>
                <li><a href="javascript:void(0);" className={filterPeople == 'Scientist'  ? 'active-link' : ''} onClick={this.sortPeoples.bind(this, 'Scientist')}>Ученые</a></li>
                <li><a href="javascript:void(0);" className={filterPeople == 'Startuper'  ? 'active-link' : ''} onClick={this.sortPeoples.bind(this, 'Startuper')}>Startapers</a></li>
              </ul>
                {people}
              </div>
              <div className="clearfix"></div>
            </div>

    }
}

export default connect(
  (state, ownProps) => ({
    preloader: state.preloader,
    alert: state.alert,
    people: state.people,
    filterPeople: state.filterPeople,
    lang: state.lang,
    location: state.routing.location,
    defaultLang: state.defaultLang,
    ownProps
  }),
  dispatch => ({
    setPageTitle: (title)=>{
      dispatch({type: "SET_PAGE_TITLE", payload: title});
    },
    onGetPeople: () => {
      let params = {
        type: 'persons'
      }
      dispatch({type: "FETCH_PEOPLE", payload: {params: params}});
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
