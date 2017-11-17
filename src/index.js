import 'whatwg-fetch';
import 'babel-polyfill';

import React from "react";
import ReactDOM from 'react-dom';
import { AppContainer } from "react-hot-loader";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware, push } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import Main from "./components/Main";
import Footer from "./components/Footer";
import ResearchMain from "./components/ResearchMain";
import StartupMain from "./components/StartupMain";
import PeopleMain from "./components/PeopleMain";
import TenderMain from "./components/TenderMain";
import MeetupMain from "./components/MeetupMain";
import Research from "./components/specificPages/Research";
import Startup from "./components/specificPages/Startup";
import People from "./components/specificPages/People";
import Tender from "./components/specificPages/Tender";
import Meetup from "./components/specificPages/Meetup";
import Article from "./components/specificPages/Article";

require("!style-loader!css-loader!sass-loader!./components/scss/fonts.scss");
require("!style-loader!css-loader!sass-loader!./components/scss/core.scss");
require("!style-loader!css-loader!sass-loader!./components/scss/utils.scss");
require("!style-loader!css-loader!sass-loader!./components/scss/layout.scss");
require("!style-loader!css-loader!sass-loader!./components/scss/header.scss");
require("!style-loader!css-loader!sass-loader!./components/scss/footer-to-bottom.scss");
require("!style-loader!css-loader!sass-loader!./components/scss/normalize.scss");

const rootEl = document.getElementById("root");
const history = createHistory();
const middleware = routerMiddleware(history);

window.onunhandledrejection = function(data) {
  console.log(data)
}
Array.prototype.containsArray = function ( array /*, index, last*/ ) {
  
      if( arguments[1] ) {
          var index = arguments[1], last = arguments[2];
      } else {
          var index = 0, last = 0; this.sort(); array.sort();
      };
  
      return index == array.length
          || ( last = this.indexOf( array[index], last ) ) > -1
          && this.containsArray( array, ++index, ++last );
  
  };

if (!Array.prototype.filter) {
  Array.prototype.filter = function(fun/*, thisArg*/) {
    'use strict';

    if (this === void 0 || this === null) {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun !== 'function') {
      throw new TypeError();
    }

    var res = [];
    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
    for (var i = 0; i < len; i++) {
      if (i in t) {
        var val = t[i];
        if (fun.call(thisArg, val, i, t)) {
          res.push(val);
        }
      }
    }

    return res;
  };
}

history.listen(() => {
  window.scrollTo(0, 0);
})

import reducer from './reducers';

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk), applyMiddleware(middleware)));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <div className="no-footer-content">
          <Route exact path="/" component={Main} />
          <Route exact path="/Research" component={ResearchMain} />
          <Route path="/Research/:id" component={Research} />
          <Route exact path="/Companies" component={StartupMain} />
          <Route path="/Startup/:id" component={Startup} />
          <Route exact path="/Community" component={PeopleMain} />
          <Route path="/People/:id" component={People} />
          <Route exact path="/Tender" component={TenderMain} />
          <Route path="/Tender/:id" component={Tender} />
          <Route exact path="/Meetup" component={MeetupMain} />
          <Route path="/Meetup/:id" component={Meetup} />
          <Route path="/Article/:id" component={Article} />
        </div>
        <Footer />
      </div>
    </ConnectedRouter >
  </Provider>,
  rootEl
);







// let author = {
//       name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//       description: "научный сотрудник Института общей и неорганической химии НАН Беларуси, научный сотрудник РНПЦ детской хирургии.",
//       links: [
//         {
//           title: "email",
//           href: "#",
//         },
//         {
//           title: "fb",
//           href: "#",
//         },
//         {
//           title: "ln",
//           href: "#",
//         },
//         {
//           title: "tg",
//           href: "#",
//         }
//       ]
//     };

// let data = {};
// data.table = {
//   fields: ['Компания', 'Специализация', 'Сфера', 'Вакансия' ],
//   items: [
//     ["321123213", 'Вакансия', 'Химия', "123213213"],
//     ["321123213", 'Вакансия', 'Химия', "123213213"]
//   ]
// }

// data.searchItems = [{
//   type: "Startup",
//   title: "Характеристика взаимодействия наночастиц коллоидного золота.",
//   sphere: "Медицина",
//   author: {
//     name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//     descr: "химик, институт неорганической химии"
//   }
// },
// {
//   type: "Research",
//   title: "Характеристика взаимодействия наночастиц коллоидного золота.",
//   sphere: "Медицина",
//   img: "name",
//   author: {
//     name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//     descr: "химик, институт неорганической химии"
//   }
// }];

// data.cards = [{
//   type: "Meetup",
//   title: "PLASMONA - ТЕСТ НА НАРКОТИКИ В ДОМАШНИХ УСЛОВИЯХ",
//   sphere: "Медицина",
//   theme: "bg-purple",
//   author: {
//     name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//     descr: "химик, институт неорганической химии"
//   },
//   date: "19.10.2017 18:00",
//   place: "ПВТ, КУПРЕВИЧА 1/5"
// }, 
// {
//   type: "Plasma",
//   title: "PLASMONA - ТЕСТ НА НАРКОТИКИ В ДОМАШНИХ УСЛОВИЯХ",
//   sphere: "Медицина",
//   author: {
//     name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//     descr: "химик, институт неорганической химии"
//   }
// },
// {
//   type: "Startup",
//   title: "PLASMONA - ТЕСТ НА НАРКОТИКИ В ДОМАШНИХ УСЛОВИЯХ",
//   sphere: "Медицина",
//   theme: "bg-purple",
//   author: {
//     name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//     descr: "химик, институт неорганической химии"
//   }
// },
// {
//   type: "Startup",
//   title: "PLASMONA - ТЕСТ НА НАРКОТИКИ В ДОМАШНИХ УСЛОВИЯХ",
//   sphere: "Медицина",
//   author: {
//     name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//     descr: "химик, институт неорганической химии"
//   }
// },
// {
//   type: "Research",
//   title: "PLASMONA - ТЕСТ НА НАРКОТИКИ В ДОМАШНИХ УСЛОВИЯХ",
//   sphere: "Медицина",
//   theme: "bg-yellow",
//   author: {
//     name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//     descr: "химик, институт неорганической химии"
//   }
// },
// {
//   type: "Research",
//   title: "PLASMONA - ТЕСТ НА НАРКОТИКИ В ДОМАШНИХ УСЛОВИЯХ",
//   sphere: "Медицина",
//   theme: "bg-image-1",
//   author: {
//     name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//     descr: "химик, институт неорганической химии"
//   }
// },
// {
//   type: "Research",
//   title: "PLASMONA - ТЕСТ НА НАРКОТИКИ В ДОМАШНИХ УСЛОВИЯХ",
//   sphere: "Медицина",
//   theme: "bg-image-2",
//   author: {
//     name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//     descr: "химик, институт неорганической химии"
//   }
// },
// {
//   type: "Tender",
//   title: "PLASMONA - ТЕСТ НА НАРКОТИКИ В ДОМАШНИХ УСЛОВИЯХ",
//   sphere: "Медицина",
//   theme: "bg-blue",
//   author: {
//     name: "ВАЛЕРИЙ КАЗАНЦЕВ",
//     descr: "химик, институт неорганической химии"
//   },
//   date: "19.10.2017 18:00",
//   activity: "Конкурс"
// }];