export default function cards (state = [], action) {
  if (action.type === 'FETCH_CARDS_SUCCESS') {
    return action.payload;
  }
  if (action.type === 'FETCH_CARDS_FAILED') {
    return action.payload;
  }
  return state;
}