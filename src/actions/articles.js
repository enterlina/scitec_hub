import {apiUrl} from '../settings.js';

export const getArticleById = (id) => dispatch => {
  
  dispatch({ type: 'ACTION_PRELOADER', payload: true });
  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/article/${id}`)
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    resolve(data);
                })
                .catch((err) => {
                    reject(err)
                });
        });

        promise.then(result => {
            console.log('data loaded');
            dispatch({ type: 'FETCH_ARTICLE_SUCCESS', payload: result[0] });
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false });

        }, error => {
            dispatch({ type: 'FETCH_ARTICLE_FAILED', payload: error });
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false });
        });
}