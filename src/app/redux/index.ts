import { combineReducers, createStore, compose } from 'redux';
import reducers from './reducers';
import middleware, { sagaMiddleware } from './middleware';
import rootSaga from './sagas/rootSaga';

const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    combineReducers(reducers),
    composeEnhancer(
        middleware,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )
);

sagaMiddleware.run(rootSaga);

export default store;
