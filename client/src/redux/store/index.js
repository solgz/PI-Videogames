import rootReducer from '../reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
// import {composedWithDevTools} from 'redux-devtools-extension';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export default store