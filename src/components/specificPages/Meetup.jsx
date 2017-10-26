import React from "react";
import { connect } from 'react-redux';
import {langArrayHandler, convertDateAndTime, cardMapData, multipleArrTransformer} from '../../utilities';
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

      document.title = 'SciTech - ' + this.props.lang.RESEARCH + ' - ' + langArrayHandler(page.name, defaultLang);

      if(page.length == 0) {
        return <Preloader />;
      }
    
      let modifiedPageData = {
        name: langArrayHandler(page.name, defaultLang),
        sphere: page.sphere.map((item)=> this.props.lang[item]).join(', '),
        description: langArrayHandler(page.description, defaultLang),
        info: multipleArrTransformer(page.info)
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
                  <div className="InfoPage--termKey">{this.props.lang.DATE || 'Date'}:</div>                  
                  <div className="InfoPage--termDescription">{convertDateAndTime(page.date)} {page.dateTo ? '- ' + convertDateAndTime(page.dateTo) : null}</div>
                </div>
                
                <div className={"InfoPage--term" + (page.regLink ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.REGISTRATION || 'Registration'}:</div>                  
                  <div className="InfoPage--termDescription"><a href={page.regLink}>{this.props.lang.REGISTER || 'Register'}</a></div>
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
                <div className={"InfoPage--term" + (modifiedPageData.description ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.DESCRIPTION || 'Description'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.description}}></div>
                </div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.ORGANAIZER || 'Organaizer'}:</div>                  
                  <div className="InfoPage--termDescription AuthorCard">{page._author.map((author, index)=>{
                      return <AuthorCard data={author} key={index} lang={defaultLang} />
                  })}
                  </div>
                </div>
                <div className={"InfoPage--term" + (page.eventHolder ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.EVENT_HOLDER || 'Event Holder'}:</div>                  
                  <div className="InfoPage--termDescription" ><a href={page.eventHolder} target="_blank">{page.eventHolder}</a></div>
                </div>
                <div className={"InfoPage--term" + (modifiedPageData.info.length !=0 ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.INFO || 'Event Holder'}:</div>                  
                  <div className="InfoPage--termDescription" ><ul>{modifiedPageData.info}</ul></div>
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
