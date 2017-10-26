export default function filterPeople (state = '', action) {
if (action.type === 'SORT_PEOPLE') {
    return action.payload;
  }
  return state;
}