/**
 * Created by serj on 7/26/17.
 */
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducers';
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
    /* apply saga */
    sagaMiddleware.run(sagas);
    return store
}