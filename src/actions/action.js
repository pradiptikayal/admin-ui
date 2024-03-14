export const REQUEST_ACTION = 'REQUEST_ACTION';
export const RECEIVE_ACTION = 'RECEIVE_ACTION';
export const ERROR_ACTION = 'ERROR_ACTION';

export const requestData = () => ({type:REQUEST_ACTION});
export const receiveData = data => ({type:RECEIVE_ACTION,payload:data});
export const errorAction = error => ({type:ERROR_ACTION, payload:error});