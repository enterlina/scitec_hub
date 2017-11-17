import {apiUrl} from '../settings.js';

export const getCards = () => dispatch => {
  dispatch({ type: 'ACTION_PRELOADER', payload: true });
  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/cards`)
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
            dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: result }); 
            
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false }); 
        }, error => {
            dispatch({ type: 'FETCH_CARDS_FAILED', payload: error });
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false });
        });
}

export const getLatestCards = () => dispatch => {
  dispatch({ type: 'ACTION_PRELOADER', payload: true });
  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/cards/latest`)
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
            dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: result }); 
            
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false }); 
        }, error => {
            dispatch({ type: 'FETCH_CARDS_FAILED', payload: error });
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false });
        });
}

export const getCardsById = ( id) => dispatch => {
  
  dispatch({ type: 'ACTION_PRELOADER', payload: true });
  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/card/${id}`)
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
            dispatch({ type: 'FETCH_SPECIFIC_CARD_SUCCESS', payload: result[0] });
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false });

        }, error => {
            dispatch({ type: 'FETCH_SPECIFIC_CARD_FAILED', payload: error });
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false });
        });
}
export const getCardsByType = ( type) => dispatch => {
  
  dispatch({ type: 'ACTION_PRELOADER', payload: true });
  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/cards/type/${type}`)
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
            dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: result });
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false });
        }, error => {
            dispatch({ type: 'FETCH_CARDS_FAILED', payload: error });
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false });
        });
}
export const getCardsByFilter = (type, name, filter) => dispatch => {
  
  dispatch({ type: 'ACTION_PRELOADER', payload: true });
  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/cards/filter/${type}/${name}/${filter}`)
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
            dispatch({ type: 'FETCH_CARDS_SUCCESS', payload: result });
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false });
        }, error => {
            dispatch({ type: 'FETCH_CARDS_FAILED', payload: error });
            
            dispatch({ type: 'ACTION_PRELOADER', payload: false });
        });
}