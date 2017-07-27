/**
 * Created by serj on 7/26/17.
 */
import {combineReducers} from 'redux';
import usersReducer from './../reducers/usersReducer'


const rootReducer = combineReducers({
    users:usersReducer,
});

export default rootReducer;
