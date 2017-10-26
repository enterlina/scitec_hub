export default function search (state = [], action) {
  if (action.type === 'SEARCH_WORD') {
    return { data: action.payload, term: action.searchWord}
  } else if (action.type === 'SEARCH_NO_ITEMS') {
    return action.payload;
  }
  return state;
}