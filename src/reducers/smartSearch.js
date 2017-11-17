export default function search (state = [], action) {
  if (action.type === 'SEARCH_WORD_SUCCESS') {
    return action.payload
  }
  return state;
}