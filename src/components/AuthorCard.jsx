import React from "react";
import {langArrayHandler, multipleArrTransformer, convertTextLinkIntoTag} from '../utilities';

import {Link} from 'react-router-dom';

require("./AuthorCard.scss");

class AuthorCard extends React.Component {
  render() {
    let author = this.props.data;
    let lang = this.props.lang;
    let contacts = [];
    if(author.contacts !== undefined) {
      contacts = multipleArrTransformer(author.contacts);
    }

    let authorDescription = langArrayHandler(author.description, lang)

    return <div className="AuthorCard">
      <h2>{ author.isCustom  ? langArrayHandler(author.name, lang) : <Link to={'/People/' + author._id}>{langArrayHandler(author.name, lang)}</Link> }</h2>
      <p className={langArrayHandler(author.description, lang).trim() != '' ? '' : 'hidden'} dangerouslySetInnerHTML={{__html:convertTextLinkIntoTag(authorDescription, lang, true)}}></p>
      <ul className={contacts ? '' : 'hidden'}>
        {contacts}
      </ul>
    </div>
  }
}

export default AuthorCard;
