import {apiUrl} from '../settings.js';

const getLangVars = (lang) => dispatch => {
  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/langvars/${lang}`)
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

            dispatch({ type: 'LANG_VARS_LOADED', payload: result });
            

        }, error => {
            dispatch({ type: 'LANG_VARS_NOT_LOADED', payload: false });
        });
}
const onLangUpdate = (lang) => {
  return getLangVars(lang);
}
export {getLangVars, onLangUpdate}