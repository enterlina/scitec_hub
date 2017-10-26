export default function article (state = [], action) {
  if (action.type === 'FETCH_ARTICLE_SUCCESS') {
    return action.payload;
  } else if (action.type === 'FETCH_ARTICLE_FAILED') {
    return false;
  }
  return state;
}