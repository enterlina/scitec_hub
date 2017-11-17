import React from "react";
import { connect } from 'react-redux';
import {langArrayHandler, convertDate, multipleArrTransformer} from '../../utilities';
require("!style-loader!css-loader!sass-loader!../InfoPage.scss");

import { getPeopleById } from '../../actions/people';
import { getLangVars } from '../../actions/language';

import Header from "../Header";
import Alert from "../Alert";
import Preloader from "../Preloader";
import AuthorCard from "../AuthorCard";

import {Link} from 'react-router-dom';


class People extends React.Component {
    componentDidMount(){
      this.props.getPeopleById(this.props.match.params.id);
      this.props.onLoadLang(this.props.defaultLang);
    }
    render() {

      let page = this.props.data;
      let defaultLang = this.props.defaultLang;

      
      if(!page) {
        return <Preloader />;
      }
      const shpere = page.sphere.map((item)=> this.props.lang[item]).join(', ');
      let prevPage = this.props.prevPages[this.props.prevPages.length - 2];
      
      let backLink = '';

      if(prevPage != undefined){   
        if(prevPage.pathname.indexOf('People') != -1) {
          backLink = <Link to={prevPage.pathname} className="backlink">{this.props.lang[(this.props.filterPeople != '' ? this.props.filterPeople : 'All')] || this.props.filterPeople}</Link>;
        } else {
          backLink = <Link to={prevPage.pathname} className="backlink">{this.props.lang.BACK_LINK || 'BACK_LINK'}</Link>;
        }
      }

      document.title = 'SciTech - ' + this.props.lang.PEOPLE + ' - ' + langArrayHandler(page.name, defaultLang);

      return <div className="InfoPage main-content">
              {this.props.alert.length != 0 ? <Alert type={this.props.alert.type} text={this.props.alert.text}/> : null}
              {this.props.preloader ? <Preloader /> : null }
              <div className="layout-navbar" >
                <Header/>
              </div>
              <div className="layout-container InfoPage--wrapper layout-container--white">
                <div className={"InfoPage--term" + (backLink ? '' : ' hidden')}>
                  {backLink}
                </div>
                <div className="InfoPage--term">
                  <h1>{langArrayHandler(page.name, defaultLang)}</h1>
                </div>

                {/* Scientist Markup */}
                { page.type == 'Scientist' ? 
                <div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.DESCRIPTION || 'DESCRIPTION'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:langArrayHandler(page.description, defaultLang)}}></div>
                </div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.CONTACTS || 'Contacts'}:</div>                  
                  <div className="InfoPage--termDescription"><ul>{multipleArrTransformer(page.contacts)}</ul></div>
                </div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.SPHERE || 'Sphere'}:</div>                  
                  <div className="InfoPage--termDescription">{shpere}</div>
                </div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.SPECIALIZATION || 'Specialization'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:langArrayHandler(page.specialization, defaultLang)}}></div>
                </div>
                <div className={"InfoPage--term" + (page.publications.length != 0 ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.PUBLICATION || 'Publication'}:</div>                  
                  <div className="InfoPage--termDescription"><ul>{multipleArrTransformer(page.publications)}</ul></div>
                </div>
                <div className={"InfoPage--term" + (page.patents.length != 0 ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.PATENTS || 'Patents'}:</div>                  
                  <div className="InfoPage--termDescription"><ul>{multipleArrTransformer(page.patents)}</ul></div>
                </div>
                <div className={"InfoPage--term" + (page.projects.length != 0 ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.PROJECTS || 'Projects'}:</div>                  
                  <div className="InfoPage--termDescription"><ul>{multipleArrTransformer(page.projects)}</ul></div>
                </div>
                </div> : null }


                {/* Startuper Markup */}

                { page.type == 'Startuper' ? 
                <div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.DESCRIPTION || 'DESCRIPTION'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:langArrayHandler(page.description, defaultLang)}}></div>
                </div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.CONTACTS || 'Contacts'}:</div>                  
                  <div className="InfoPage--termDescription"><ul>{multipleArrTransformer(page.contacts)}</ul></div>
                </div>
                <div className={"InfoPage--term" + (page.sphere.length != 0 ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.SPHERE || 'Sphere'}:</div>                  
                  <div className="InfoPage--termDescription">{shpere}</div>
                </div>
                <div className={"InfoPage--term" + (page.sphere.length != 0 ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.SPECIALIZATION || 'Specialization'}:</div>                  
                  <div className="InfoPage--termDescription" dangerouslySetInnerHTML={{__html:langArrayHandler(page.specialization, defaultLang)}}></div>
                </div>
                <div className={"InfoPage--term" + (page.projects.length != 0 ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.PROJECTS || 'Projects'}:</div>                  
                  <div className="InfoPage--termDescription"><ul>{multipleArrTransformer(page.projects)}</ul></div>
                </div>
                </div> : null }

                
                {/* Business Markup */}

                { page.type == 'Business' || page.type == 'Fund' || page.type == 'Accelerator'? 
                <div>
                
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.COMPANY_SPHERE || 'Company Sphere'}:</div>                  
                  <div className="InfoPage--termDescription">{shpere}</div>
                </div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.DESCRIPTION || 'DESCRIPTION'}:</div>                  
                  <div className="InfoPage--termDescription"  dangerouslySetInnerHTML={{__html:langArrayHandler(page.description, defaultLang)}}></div>
                </div>
                <div className="InfoPage--term">
                  <div className="InfoPage--termKey">{this.props.lang.CONTACTS || 'Contacts'}:</div>                  
                  <div className="InfoPage--termDescription"><ul>{multipleArrTransformer(page.contacts)}</ul></div>
                </div>
                <div className={"InfoPage--term" + (page.site ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.SITE || 'Site'}:</div>                  
                  <div className="InfoPage--termDescription"><a href={page.site} target="_blank">{page.site}</a></div>
                </div>
                <div className={"InfoPage--term" + (page.address.length != 0 ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.ADDRESS || 'Address'}:</div>                  
                  <div className="InfoPage--termDescription"  dangerouslySetInnerHTML={{__html:langArrayHandler(page.address, defaultLang)}}></div>
                </div>
                <div className={"InfoPage--term" + (page.job.length != 0 ? '' : ' hidden')}>
                  <div className="InfoPage--termKey">{this.props.lang.JOB || 'Job'}:</div>                  
                  <div className="InfoPage--termDescription">{langArrayHandler(page.job, defaultLang)}</div>
                </div>
                </div> : null }

              </div>
            </div>
    }
}

export default connect(
  state => ({
    data: state.specificPeople[0],
    preloader: state.preloader,
    alert: state.alert,
    lang: state.lang,
    defaultLang: state.defaultLang,
    prevPages: state.routerLocations,
    filterPeople: state.filterPeople
  }),
  dispatch => ({
    getPeopleById: (id) => {
      dispatch(getPeopleById(id));
    },
    onLoadLang: (lang) => {
      dispatch(getLangVars(lang));
    }
  })
)(People);