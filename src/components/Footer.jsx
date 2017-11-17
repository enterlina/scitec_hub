import React from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

require("./Footer.scss");
const subscribe = `<!-- Begin MailChimp Signup Form -->
                            <link href="//cdn-images.mailchimp.com/embedcode/slim-10_7.css" rel="stylesheet" type="text/css">
                            <div id="mc_embed_signup">
                            <form style="padding: 0;" action="//sciencehit.us14.list-manage.com/subscribe/post?u=85e324d7c30f904f1f8571443&amp;id=0886f4ed18" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                                <div id="mc_embed_signup_scroll">
                            <label for="mce-EMAIL" style="text-transform: uppercase">Get the scientific updates</label>
                            <input type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="email " required>
                                <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
                                <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_85e324d7c30f904f1f8571443_0886f4ed18" tabindex="-1" value=""></div>
                                <div class="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="Button Button--blue"></div>
                                </div>
                            </form>
                            </div>

                            <!--End mc_embed_signup-->`;
class Footer extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <footer className="Footer">
            <div className="layout-container">
                <div className="Footer-logo-container">
                    <Link to="/" className="Header-logo Footer-logo link-no-text">SciTech</Link>
                    <div className="Footer-logo-text">
                        develop together
                    </div>
                </div>
                <div className="Footer-grid-wrapper">
                    <div className="Footer-grid-first-column">
                        <ul className="Footer-navigation" role="navigation">
                            <li><Link to="/Research" className={this.props.page.indexOf('Research') != '-1' ? 'active-link' : ''}>{this.props.lang.RESEARCH || 'Researches'}</Link></li>
                            <li><Link to="/Startup" className={this.props.page.indexOf('Startup') != '-1' ? 'active-link' : ''}>{this.props.lang.COMPANIESn || 'Companies'}</Link></li>
                            <li className="about-project"><Link to="/Article/59b69a108b639c0ce1d52166">{this.props.lang.ABOUT_US || 'About Us'}</Link></li>
                        </ul>
                    </div>
                    <div className="Footer-grid-second-column">
                        <a href="https://goo.gl/forms/FniLdnwZxQvRjABl1" target="_blank" className="Button Button--green">
                            {this.props.lang.ADD_RESEARCH || 'Add Research'}
                        </a>
                        <a href="https://goo.gl/forms/zb93HhOflrHV0yQ52" target="_blank" className="Button Button--blue">
                            {this.props.lang.ADD_PROJECT || 'Add Project'}
                        </a>
                        
                        <a href="https://goo.gl/forms/g1w9GmsYcjoIxKM32" target="_blank" className="Button Button--gray">
                            {this.props.lang.WRITE_US || 'Write us'}
                        </a>
                        <ul className="Footer-additional-navigation hidden" role="navigation">
                            <li><a href="#" className="plasma">Plasma +</a></li>
                            <li><Link to="/Startup" className={this.props.page.indexOf('Search_experts') != '-1' ? 'active-link' : ''}>{this.props.lang.SEARCH_EXPERTS || 'Search Experts'}</Link></li>
                            <li><Link to="/Submit_idea" className={this.props.page.indexOf('People') != '-1' ? 'active-link' : ''}>{this.props.lang.SUBMIT_IDEA || 'Submit Idea'}</Link></li>
                            <li><Link to="/Submit_business_application" className={this.props.page.indexOf('Tenders') != '-1' ? 'active-link' : ''}>{this.props.lang.SUBMIT_BUSINESS_APPLICATION || 'Submit Busines Application'}</Link></li>
                        </ul>
                    </div>
                    <div className="Footer-grid-third-column">
                        <div dangerouslySetInnerHTML={{__html:subscribe}}></div>
                        <ul className="Footer-social-networks layout-container" role="navigation">
                            <li><a href="https://www.linkedin.com/company/11306987/" target="_blank">{this.props.lang.Linkedin || 'Linkedin'}</a></li>
                            <li><a href="https://www.facebook.com/scitechby/" target="_blank">Facebook</a></li>
                            <li><a href="https://www.youtube.com/channel/UClF9SlczBDDEbB9JxKCVaBw" target="_blank">YouTube</a></li>
                            <li><a href="https://t.me/joinchat/BoOWGEN1HrzaFkbzH0bzXg" target="_blank">Telegram</a></li>
                            <li className="email"><a href="mailto:sciencehitby@gmail.com">scitechubio@gmail.com</a></li>
                        </ul>
                    </div>
                </div>
                <div className="Footer-copyright-information">
                    &copy; 	&#171;SciTecHub&#187; 2017
                </div>
            </div>
        </footer>
    }
}

export default connect(
    state => ({
        lang: state.lang,
        defaultLang: state.defaultLang,
        page: (state.routing.location !== null ? state.routing.location.pathname : '')
    }),
    dispatch => ({
        setDefaultLang: (lang) => {
            dispatch({ type: 'SET_DEFAULT_LANG', payload: lang });
            dispatch(onLangUpdate(lang));
        },
    })
)(Footer);
