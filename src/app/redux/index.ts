import { combineReducers, createStore } from 'redux';
import reducers from './reducers';

const store = createStore(
    combineReducers(reducers),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
