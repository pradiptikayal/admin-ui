import { requestData,receiveData,errorAction } from './action';
const updateUserDetails =(data) => async dispatch =>{
    requestData();
    try
    {
        dispatch(receiveData(data));
    }
    catch(error)
    {
        dispatch(errorAction(`Unable to load:,${error}`))
    }
};

export default updateUserDetails;