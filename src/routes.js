import React from "react";
import { Route } from 'react-router-dom';

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

export const Routes = () => {
  return <div>
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
}
