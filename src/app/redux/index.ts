import { combineReducers, createStore } from 'redux';
import reducers from './reducers';
import middleware, { sagaMiddleware } from './middleware';
import rootSaga from './sagas/rootSaga';

const store = createStore(
    combineReducers(reducers),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
        (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
    middleware
);

sagaMiddleware.run(rootSaga);

export default store;
