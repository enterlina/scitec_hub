export default function specificPeople (state = [], action) {
  if (action.type === 'FETCH_SPECIFIC_PEOPLE_SUCCESS') {
    return action.payload;
  } else if (action.type === 'FETCH_SPECIFIC_PEOPLE_FAILED') {
    return false;
  }
  return state;
}