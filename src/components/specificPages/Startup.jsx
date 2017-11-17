import React from "react";
import { connect } from 'react-redux';
import {langArrayHandler, convertDate} from '../../utilities';
require("../InfoPage.scss");

import Header from "../Header";
import Alert from "../Alert";
import Preloader from "../Preloader";
import AuthorCard from "../AuthorCard";


class Research extends React.Component {
    componentWillMount(){
      

      this.props.getCardById(this.props.match.params.id);
      this.props.onLoadLang(this.props.defaultLang);

    }
    componentDidMount() {
      let page = this.props.data;
      let defaultLang = this.props.defaultLang;
      this.props.setPageTitle(this.props.lang.STARTUPS + ' - ' + langArrayHandler(page.name, defaultLang)); 
    }
    render() {


      let page = this.props.data;
      let defaultLang = this.props.defaultLang;
      

      if(page.length == 0) {
        return <Preloader />;
      }
      let modifiedPageData = {
        name: langArrayHandler(page.name, defaultLang),
        problem: langArrayHandler(page.problem, defaultLang),
        solution: langArrayHandler(page.solution, defaultLang),
        info: langArrayHandler(page.info, defaultLang),
        needToFind: langArrayHandler(page.needTofind, defaultLang),
        skills: langArrayHandler(page.skils, defaultLang),
        tags: langArrayHandler(page.tags, defaultLang)  ,
        sphere: page.sphere.map((item)=> this.props.lang[item]).join(', '),
        stage: langArrayHandler(page.stage, defaultLang)
      }
      return <div className="InfoPage main-content">
              {this.props.alert.length != 0 ? <Alert type={this.props.alert.type} text={this.props.alert.text}/> : null}
              {this.props.preloader ? <Preloader /> : null }
              <div className="layout-navbar" >
                <Header/>
              </div>
              <div className="layout-container InfoPage--wrapper layout-container--white">
                <div className={`InfoPage--heading ${page.type}`}>
                  <i className={`icon-marker-${page.type.toLowerCase()}`}></i>
                  <span className="sphere">{modifiedPageData.sphere}</span>
                  <h1>{modifiedPageData.name}</h1>
                </div>
                <div className={"InfoPage--term" + (modifiedPageData.stage ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.STAGE || 'Stage'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.stage}} ></div>
                </div>
                { page.video ? 
                (<div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.VIDEO || 'video'}:</div>                  
                  <div className="InfoPage--termDescription"><iframe width="560" height="315" src={`https://www.youtube.com/embed/${page.video}`} frameborder="0" allowfullscreen></iframe></div>
                </div>) : null }
                { page.presentation ? 
                (<div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.PRESENTATION || 'Presentation'}:</div>                  
                  <div className="InfoPage--termDescription">
                  <iframe allowfullscreen="" frameborder="0" height="485" marginheight="0" marginwidth="0" scrolling="no" width="560" src={`//www.slideshare.net/slideshow/embed_code/key/${page.presentation}`}> </iframe>
                  </div>
                </div>) : null }
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.CONTACTS || 'Contacts'}:</div>                  
                  <div className="InfoPage--termDescription">{page._author.map((author, index)=>{
                      return <AuthorCard data={author} key={index} lang={defaultLang} />
                  })}
                  </div>
                </div>
                <div className={"InfoPage--term" + (modifiedPageData.problem ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.PROBLEM || 'Problem'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.problem}}></div>
                </div>
                
                <div className={"InfoPage--term" + (modifiedPageData.solution ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.SOLUTION || 'Solution'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.solution}}></div>
                </div>
                <div className={"InfoPage--term" + (page.demo ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.DEMO || 'Demo'}:</div>                  
                  <div className="InfoPage--termDescription"><a href={page.demo} target="_blank">{page.demo}</a></div>
                </div>
                <div className={"InfoPage--term" + (modifiedPageData.info ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.INFO || 'Info'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.info}}></div>
                </div>
                <div className={"InfoPage--term" + (modifiedPageData.needTofind ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.WHOISNEEDED || 'Who is needed'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.needTofind}}></div>
                </div>
                <div className={"InfoPage--term" + (modifiedPageData.skils ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.SKILS || 'Skils'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.skils}}></div>
                </div>
                <div className={"InfoPage--term" + (Array.isArray(modifiedPageData.tags) ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.TAGS || 'Tags'}:</div>                  
                  <div className="InfoPage--termDescription">{Array.isArray(modifiedPageData.tags) ? modifiedPageData.tags.join(', ') : ''}</div>
                </div>
                
              </div>
            </div>
    }
}

export default connect(
  state => ({
    data: state.specificCard,
    preloader: state.preloader,
    alert: state.alert,
    lang: state.lang,
    defaultLang: state.defaultLang
  }),
  dispatch => ({
    setPageTitle: (title)=>{
      dispatch({type: "SET_PAGE_TITLE", payload: title});
    },
    getCardById: (id) => {
      let params = {
        type: 'card',
        query: id
      }
      dispatch({type: "FETCH_SPECIFIC_CARD", payload: { params: params}});
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