export default function alerts (state = [], action) {
  if (action.type === 'ADD_ALERT') {
    return action.payload;
  }
  else if (action.type === 'REMOVE_ALERT') {
    return [];
  }
  return state;
}