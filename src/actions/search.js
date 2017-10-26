import {apiUrl} from '../settings.js';

export const search = (searchTerm) => dispatch => {

  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/search/${searchTerm}`)
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
            
            if(result.length == 0) {
              dispatch({ type: 'SEARCH_NO_ITEMS', payload: false });
              return;
            }

            dispatch({ type: 'SEARCH_WORD', payload: result, searchWord: searchTerm  });

        }, error => {
            dispatch({ type: 'SEARCH_NO_ITEMS', payload: false });
        });
}