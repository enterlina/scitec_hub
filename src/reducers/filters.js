export default function filterPeople (state = {}, action) {
  if (action.type === 'SET_FILTERS') {
      if(action.payload.selected.length != 0) {
        state[action.payload.name] = action.payload.selected
      } else {
        delete state[action.payload.name];
      }
      return {...state};
    }
    return state;
  }