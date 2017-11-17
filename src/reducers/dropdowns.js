export default function dropdowns (state = [], action) {
  if (action.type === 'GET_DROPDOWNS_SUCCESS') {
    return action.payload;
  }  
  if (action.type === 'GET_DROPDOWNS_FAILED') {
    return false;
  }
  return state;
}