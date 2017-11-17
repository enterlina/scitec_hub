import {combineReducers} from 'redux';
import { routerReducer } from 'react-router-redux';

import cards from "./cards";
import specificCard from "./specificCard";
import search from "./smartSearch";
import lang from "./language";
import defaultLang from "./defaultLang";
import alert from "./alert";
import preloader from "./preloader";
import people from "./people";
import filterPeople from "./filterPeople";
import specificPeople from "./specificPeople";
import routerLocations from "./path";
import article from "./article";
import dropdowns from "./dropdowns";
import filters from "./filters";
import searchTerm from "./searchTerm";
import pageTitle from "./title";

export default combineReducers({
  routing: routerReducer,
  defaultLang,
  searchTerm,
  pageTitle,
  cards,
  search,
  lang,
  alert,
  preloader,
  filterPeople,
  specificCard,
  people,
  specificPeople,
  routerLocations,
  article,
  specificCard,
  dropdowns,
  filters
});