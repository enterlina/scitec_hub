import {apiUrl} from '../settings.js';

const getDropdowns = (lang) => dispatch => {

  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/dropdowns`)
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

            dispatch({ type: 'DROPDOWNS_LOADED', payload: result });
            

        }, error => {
            dispatch({ type: 'DROPDOWNS_NOT_LOADED', payload: false });
        });
}

export {getDropdowns}