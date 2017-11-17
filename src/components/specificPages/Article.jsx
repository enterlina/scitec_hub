import React from "react";
import { connect } from 'react-redux';
import {langArrayHandler, convertDate} from '../../utilities';
require("../InfoPage.scss");

import Header from "../Header";
import Alert from "../Alert";
import Preloader from "../Preloader";


class Research extends React.Component {
    componentWillMount(){     
      
      
      this.props.getArticleById(this.props.match.params.id);
      this.props.onLoadLang(this.props.defaultLang);
    }
    componentDidMount() {
      let page = this.props.data;
      let defaultLang = this.props.defaultLang;
      let name = langArrayHandler(page.name, defaultLang) ? ' - ' + langArrayHandler(page.name, defaultLang) : '' 
      this.props.setPageTitle('Article' + name); 
    }
    render() {

      let page = this.props.data;
      let defaultLang = this.props.defaultLang;


      if(page.length == 0) {
        return <Preloader />;
      }
      

      let modifiedPageData = {
        name: langArrayHandler(page.name, defaultLang),
        description: langArrayHandler(page.description, defaultLang)
      }
      return <div className="InfoPage main-content Article">
              {this.props.alert.length != 0 ? <Alert type={this.props.alert.type} text={this.props.alert.text}/> : null}
              {this.props.preloader ? <Preloader /> : null }
              <div className="layout-navbar" >
                <Header/>
              </div>
              <div className="layout-container InfoPage--wrapper layout-container--white">
                <div className={`InfoPage--heading`}>
                  <h1>{modifiedPageData.name}</h1>
                </div>
                <div dangerouslySetInnerHTML={{__html:modifiedPageData.description}}></div>
              </div>
            </div>
    }
}

export default connect(
  state => ({
    data: state.article,
    preloader: state.preloader,
    alert: state.alert,
    lang: state.lang,
    defaultLang: state.defaultLang
  }),
  dispatch => ({
    setPageTitle: (title)=>{
      dispatch({type: "SET_PAGE_TITLE", payload: title});
    },
    getArticleById: (id) => {
      let params = {
        type: 'article',
        query: id
      }
      dispatch({type: "FETCH_ARTICLE", payload: { params: params}});
    },
    onLoadLang: (lang) => {
      let params = {
        type: 'langvars',
        query: lang
      }
      dispatch({type: "LANG_VARS", payload: { params: params, isLoader: false}});
    }
  })
)(Research);