export default function filterPeople (state = [], action) {
  if (action.type === 'SET_FILTERS') {      
      return action.payload;
    }
    return state;
  }