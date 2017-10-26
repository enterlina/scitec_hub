import React from "react";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import QuickSearch from "./search/QuickSearch";

require("!style-loader!css-loader!sass-loader!./Header.scss");

import { onLangUpdate } from '../actions/language';
import { getCards } from '../actions/cards';

class Header extends React.Component {
    constructor() {
      super();
      this.state = {
        isSearchActive: false,
        isMenuHidden: true
      }
    }
    toggleSearch() {
      this.setState({ isSearchActive: !this.state.isSearchActive });
    }
    toggleMenu() {
      this.setState({ isMenuHidden: !this.state.isMenuHidden });
    }
    render() {
        return <header className="Header layout-container">
            <Link to="/" className="Header-logo link-no-text">SciTech</Link>
            <div className="hamburger" onClick={this.toggleMenu.bind(this)}>
                <div className="hamburger-stripe"></div>
            </div>

            <nav className={"Header-navigation" + (this.state.isMenuHidden ? ' hideMobile' : '')} role="navigation">
                <li><Link to="/Research" className={this.props.page.indexOf('Research') != '-1' ? 'active-link' : ''}>{this.props.lang.RESEARCH || 'Researches'}</Link></li>
                <li><Link to="/Companies" className={this.props.page.indexOf('Companies') != '-1' ? 'active-link' : ''}>{this.props.lang.COMPANIES || 'Companies'}</Link></li>
                <li><Link to="/Community" className={this.props.page.indexOf('Community') != '-1' ? 'active-link' : ''}>{this.props.lang.COMMUNITY || 'Community'}</Link></li>
                <li><Link to="/Tender" className={"link-no-text icon-tender" + (this.props.page.indexOf('Tender') != '-1' ? ' active-link' : '')}>{this.props.lang.TENDERS || 'Tenders'}</Link></li>
                <li><Link to="/Meetup" className="link-no-text icon-meetup">{this.props.lang.MEETUPS || 'Meetups'}</Link></li>
                <li className="about-project"><Link to="/Article/59b69a108b639c0ce1d52166">{this.props.lang.ABOUT_US || 'About Us'}</Link></li>
                <li><a href="#" className="link-no-text icon-search" onClick={this.toggleSearch.bind(this)}>{this.props.lang.SEARCH || 'Search'}</a></li>
                <li><a href="#" className="link-no-text plasma">Plasma +</a></li>
                <li className="lang-selector">
                    <a href="#" className={this.props.defaultLang == 'ru' ? "lang-active" : ""} onClick={this.props.setDefaultLang.bind(this,'ru')}>Ru</a>
                    <span>/</span>
                    <a href="#" className={this.props.defaultLang == 'en' ? "lang-active" : ""} onClick={this.props.setDefaultLang.bind(this, "en")}>En</a>
                </li>
            </nav>
         {this.state.isSearchActive ? <QuickSearch/> : null}
        </header>

    }
}

export default connect(
  state => ({
    lang: state.lang,
    defaultLang: state.defaultLang,
    page: state.routing.location.pathname
  }),
  dispatch => ({
    setDefaultLang: (lang) => {
      dispatch({ type: 'SET_DEFAULT_LANG', payload: lang });
      dispatch(onLangUpdate(lang));
    },
  })
)(Header);
