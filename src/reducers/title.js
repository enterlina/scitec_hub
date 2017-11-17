export default function pageTitle(state = '', action) {
  
  let name = 'SciHub';

  switch (action.type) {
    case "SET_PAGE_TITLE":
      if(action.payload){
        name += ' - ' + action.payload;
      }
      return name
    default:
      return state;
  }
}