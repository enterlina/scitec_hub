export default function people (state = [], action) {
  if (action.type === 'FETCH_PEOPLE_SUCCESS') {
    return action.payload;
  } 
  return state;
}