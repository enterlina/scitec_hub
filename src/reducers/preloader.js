export default function preloader (state = [], action) {
  if (action.type === 'ACTION_PRELOADER') {
    return action.payload;
  }
  return state;
}