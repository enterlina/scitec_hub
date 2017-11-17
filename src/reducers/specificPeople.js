export default function specificPeople (state = [], action) {
  if (action.type === 'FETCH_SPECIFIC_PEOPLE_SUCCESS') {
    return action.payload[0];
  } else if (action.type === 'FETCH_SPECIFIC_PEOPLE_FAILED') {
    return false;
  }
  return state;
}