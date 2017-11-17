import {createStore, combineReducers, applyMiddleware} from 'redux';
import createSagaMiddleware, {END} from 'redux-saga';
import rootReducer from './reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import saga from './sagas';
import {Store} from 'redux'

const sagaMiddleware = createSagaMiddleware();

export default (initialState) => {
  const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)));
  
  store.runSaga = sagaMiddleware.run;
  store.close = ()=> store.dispatch(END);
  sagaMiddleware.run(saga);

  return store;
}