import {apiUrl} from '../settings.js';

export const getPeople = () => dispatch => {
  dispatch({ type: 'ACTION_PRELOADER', payload: true });
  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/persons`)
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
            dispatch({ type: 'FETCH_PEOPLE_SUCCESS', payload: result });
            dispatch({ type: 'ACTION_PRELOADER', payload: false }); 
        }, error => {
            dispatch({ type: 'FETCH_PEOPLE_FAILED', payload: result });
            dispatch({ type: 'ACTION_PRELOADER', payload: false }); 
        });
}

export const getCompanies = () => dispatch => {
  dispatch({ type: 'ACTION_PRELOADER', payload: true });
  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/companies`)
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
            dispatch({ type: 'FETCH_PEOPLE_SUCCESS', payload: result });
            dispatch({ type: 'ACTION_PRELOADER', payload: false }); 
        }, error => {
            dispatch({ type: 'FETCH_PEOPLE_FAILED', payload: result });
            dispatch({ type: 'ACTION_PRELOADER', payload: false }); 
        });
}

export const getPeopleById = (id) => dispatch => {
  dispatch({ type: 'ACTION_PRELOADER', payload: true });
  let promise = new Promise((resolve, reject) => {
            fetch(`${apiUrl}/person/${id}`)
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
            dispatch({ type: 'FETCH_SPECIFIC_PEOPLE_SUCCESS', payload: result });
            dispatch({ type: 'ACTION_PRELOADER', payload: false }); 
        }, error => {
            dispatch({ type: 'FETCH_SPECIFIC_PEOPLE_FAILED', payload: result });
            dispatch({ type: 'ACTION_PRELOADER', payload: false }); 
        });
}