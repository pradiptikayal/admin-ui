import React, {useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
// import LoadingOverlay from 'react-loading-overlay';
import {AgGridReact} from 'ag-grid-react';
import {styled} from '@mui/material/styles';
import getUserDetails from './actions/getUserDetails';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './AdminUi.css';

const MyComponent = styled('div')({
    height: 'calc(100vh - 54px)',
    display: 'flex',
    flexDirection: 'column'
});

const MyRowWrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
});

const AdminUi = () =>{
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userDetailReducer);
    // eslint-disable-next-line
    useEffect(()=>{
        if(!userDetails.data && !userDetails.error && !userDetails.loading)
        {
            dispatch(getUserDetails());
        }
    });

    const createCols = k =>({
        headerName: k,
        field:k
    });

    const getColDefs = row => Object.keys(row).map(k =>createCols(k));

    const headerView =(
        <header><h1>User Details</h1></header>
    );
    return(
        <MyComponent>
        <MyRowWrapper>{headerView}</MyRowWrapper>
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
            <AgGridReact
                rowData = {userDetails.data}
                columnDefs = {userDetails.data !== undefined ? getColDefs(userDetails.data[0]):[]}
            />
        </div>
        </MyComponent>
    )
}

AdminUi.propTypes ={
};

export default AdminUi;

