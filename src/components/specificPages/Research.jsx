import React from "react";
import { connect } from 'react-redux';
import {langArrayHandler, convertDate} from '../../utilities';
require("!style-loader!css-loader!sass-loader!../InfoPage.scss");

import { getCardsById } from '../../actions/cards';
import { getLangVars } from '../../actions/language';

import Header from "../Header";
import Alert from "../Alert";
import Preloader from "../Preloader";
import AuthorCard from "../AuthorCard";


class Research extends React.Component {
    componentWillMount(){
      this.props.getCardById(this.props.match.params.id);
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
        methods: langArrayHandler(page.methods, defaultLang),
        solution: langArrayHandler(page.solution, defaultLang),
        recommendation: langArrayHandler(page.recommendation, defaultLang),
        use: langArrayHandler(page.use, defaultLang),
        problem: langArrayHandler(page.problem, defaultLang),
        sphere: page.sphere.map((item)=> this.props.lang[item]).join(', '),
        skills: langArrayHandler(page.skils, defaultLang),
        tags: langArrayHandler(page.tags, defaultLang)  ,
        goal: langArrayHandler(page.goal, defaultLang)
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
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.AUTHOR || 'Author'}:</div>                  
                  <div className="InfoPage--termDescription">{page._author.map((author, index)=>{
                      return <AuthorCard data={author} key={index} lang={defaultLang} />
                  })}
                  </div>
                </div>
                { page.video ? 
                (<div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.VIDEO || 'video'}:</div>                  
                  <div className="InfoPage--termDescription"><iframe width="560" height="315" src={`https://www.youtube.com/embed/${page.video}`} frameborder="0" allowfullscreen></iframe></div>
                </div>) : null }
                <div  className={"InfoPage--term" + (modifiedPageData.problem ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.PROBLEM || 'Problem'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.problem}}></div>
                </div>
                <div  className={"InfoPage--term" + (modifiedPageData.goal ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.GOAL || 'Goal'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.goal}}></div>
                </div>
                <div  className={"InfoPage--term" + (modifiedPageData.methods ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.METHODS || 'Methods'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.methods}}></div>
                </div>
                <div  className={"InfoPage--term" + (modifiedPageData.solution ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.RESULTS || 'Results'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.solution}}></div>
                </div>
                <div  className={"InfoPage--term" + (modifiedPageData.recommendation ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.RECOMENDATIONS || 'Recomendations'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.recommendation}}></div>
                </div>
                <div  className={"InfoPage--term" + (modifiedPageData.use ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.USING || 'Using'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.use}}></div>
                </div>
                <div  className={"InfoPage--term" + (Array.isArray(modifiedPageData.tags) ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.TAGS || 'Tags'}:</div>                  
                  <div className="InfoPage--termDescription" >{Array.isArray(modifiedPageData.tags) ? modifiedPageData.tags.join(', ') : ''}</div>
                </div>
                
                <div className={"InfoPage--term" + (page.download ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.DOWNLOAD || 'Download'}:</div>                  
                  <div className="InfoPage--termDescription"><a href={page.download} target="_blank">{page.download}</a></div>
                </div>
                
                <div className={"InfoPage--term" + (page.date ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.DATE || 'Date'}:</div>                  
                  <div className="InfoPage--termDescription">{convertDate(page.date)}</div>
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
    getCardById: (lang, id) => {
      dispatch(getCardsById(lang, id));
    },
    onLoadLang: (lang) => {
      dispatch(getLangVars(lang));
    }
  })
)(Research);
