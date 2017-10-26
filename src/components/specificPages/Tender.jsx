import React from "react";
import { connect } from 'react-redux';
import {langArrayHandler, convertDate, cardMapData,multipleArrTransformer} from '../../utilities';
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
        status: langArrayHandler(page.status, defaultLang),
        description: langArrayHandler(page.description, defaultLang),
        tags: langArrayHandler(page.tags, defaultLang),
        info: multipleArrTransformer(page.info),
        sphere: page.sphere.map((item)=> this.props.lang[item]).join(', '),
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
                <div className={"InfoPage--term" + (page.tenderReward ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.TENDER_REVARD || 'Revard'}:</div>                  
                  <div className="InfoPage--termDescription">{page.tenderReward}</div>
                </div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.PUBLICATION_DATE || 'Date of publication'}:</div>                  
                  <div className="InfoPage--termDescription">{convertDate(page.creationDate)}</div>
                </div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.DEADLINE || 'Deadline'}:</div>                  
                  <div className="InfoPage--termDescription">{convertDate(page.tenderDeadline)}</div>
                </div>
                
                <div className={"InfoPage--term" + (modifiedPageData.status ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.STATUS || 'Status'}:</div>                  
                  <div className="InfoPage--termDescription">{modifiedPageData.status}</div>
                </div>
                <div className={"InfoPage--term" + (modifiedPageData.description ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.DESCRIPTION || 'Description'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:modifiedPageData.description}}></div>
                </div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.ORGANAIZER || 'ORGANAIZER'}:</div>                  
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
                <div  className={"InfoPage--term" + (Array.isArray(modifiedPageData.tags) ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.TAGS || 'Tags'}:</div>                  
                  <div className="InfoPage--termDescription" >{Array.isArray(modifiedPageData.tags) ? modifiedPageData.tags.join(', ') : ''}</div>
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
