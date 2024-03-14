import { REQUEST_ACTION, RECEIVE_ACTION, ERROR_ACTION } from '../actions/action';

const getUserDetailsReducer = (state ={}, action) =>{
    const {type,payload} = action;

    switch(type){
        case REQUEST_ACTION: return{...state, loading:true, error:''};
        case RECEIVE_ACTION: return{...state, loading:false, data:payload};
        case ERROR_ACTION: return{...state, loading:false, error:payload};
        default: return state;
    }
};

export default getUserDetailsReducer;