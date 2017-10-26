export default function specificCard (state = [], action) {
  if (action.type === 'FETCH_SPECIFIC_CARD_SUCCESS') {
    return action.payload;
  } else if (action.type === 'FETCH_SPECIFIC_CARD_FAILED') {
    return false;
  }
  return state;
}