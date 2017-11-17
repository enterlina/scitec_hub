export default function preloader (state = true, action) {
  if (action.type === 'ACTION_PRELOADER') {
    return action.payload;
  }
  return state;
}