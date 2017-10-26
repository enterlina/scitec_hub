export const createAlert = (params) => dispatch => {
  dispatch({ type: 'ADD_ALERT', payload: params });
  
  setTimeout(()=>{
    dispatch({ type: 'REMOVE_ALERT' });
  }, 2000);
}