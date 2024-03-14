import {combineReducers} from 'redux';
import getUserDetailsReducer from './getUserDetailsReducer';


const rootReducer = combineReducers({
    userDetailReducer: getUserDetailsReducer
});

export default rootReducer;