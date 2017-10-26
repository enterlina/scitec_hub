import React from "react";
import { connect } from 'react-redux';
import {langArrayHandler, convertDate} from '../../utilities';
require("!style-loader!css-loader!sass-loader!../InfoPage.scss");

import { getArticleById } from '../../actions/articles';
import { getLangVars } from '../../actions/language';

import Header from "../Header";
import Alert from "../Alert";
import Preloader from "../Preloader";


class Research extends React.Component {
    componentWillMount(){
      this.props.getArticleById(this.props.match.params.id);
      this.props.onLoadLang(this.props.defaultLang);
    }
    render() {

      let page = this.props.data;
      let defaultLang = this.props.defaultLang;


      if(page.length == 0) {
        return <Preloader />;
      }
      
      document.title = 'SciTech - ' + this.props.lang.RESEARCH + ' - ' + langArrayHandler(page.name, defaultLang);

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
    getArticleById: (lang, id) => {
      dispatch(getArticleById(lang, id));
    },
    onLoadLang: (lang) => {
      dispatch(getLangVars(lang));
    }
  })
)(Research);