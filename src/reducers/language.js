export default function langVars (state = [], action) {
  if (action.type === 'LANG_VARS_LOADED') {
    return action.payload;
  }  
  if (action.type === 'LANG_VARS_NOT_LOADED') {
    return false;
  }
  return state;
}