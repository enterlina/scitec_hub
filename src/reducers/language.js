export default function langVars (state = [], action) {
  if (action.type === 'LANG_VARS_SUCCESS') {
    return action.payload;
  }  
  if (action.type === 'LANG_VARS_FAILED') {
    return false;
  }
  return state;
}