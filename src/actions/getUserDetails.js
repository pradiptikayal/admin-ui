import axios from 'axios';
import { requestData,receiveData,errorAction } from './action';

const getUserDetails = () =>  async dispatch =>{
    dispatch(requestData());
    try{
        const response = await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        const { data } = response;
        dispatch(receiveData(data));
    }
    catch(error)
    {
        dispatch(errorAction(`Unable to load:,${error}`))
    }
};

export default getUserDetails;