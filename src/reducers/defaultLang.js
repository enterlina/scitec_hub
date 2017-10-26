export default function defaultLang (state = 'en', action) {
  if (action.type === 'SET_DEFAULT_LANG') {
    return action.payload;
  }
  return state;
}