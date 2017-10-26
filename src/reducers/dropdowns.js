export default function dropdowns (state = [], action) {
  if (action.type === 'DROPDOWNS_LOADED') {
    return action.payload;
  }  
  if (action.type === 'DROPDOWNS_NOT_LOADED') {
    return false;
  }
  return state;
}