export default function searchTerm (state = '', action) {
  if (action.type === 'SET_TERM') {
    return action.payload;
  }
  return state;
}