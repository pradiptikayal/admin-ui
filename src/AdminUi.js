import React, {useEffect,useState} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {AgGridReact} from 'ag-grid-react';
import {styled} from '@mui/material/styles';
import getUserDetails from './actions/getUserDetails';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './AdminUi.css';
import updateUserDetails from './actions/updateUserDetails';

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
    const [rowData, setRowData] = useState([]);
    const [gridApi, setGridApi] = useState(null);
    const [searchText, setSearchText] = useState('');
    // eslint-disable-next-line
    useEffect(()=>{
        if(!userDetails.data && !userDetails.error && !userDetails.loading)
        {
            dispatch(getUserDetails());
        }
        if(userDetails.data)
        {
            setRowData(userDetails.data)
        }
    });

    const onGridReady = (params) =>{
        setGridApi(params.api);
    }

    const createCols = k =>({
        headerName: k,
        field:k,
        editable: k ==='id' ? false:true
    });

    const handleEdit = editData =>{
        const updatedRowData = rowData.map(row => {
            if (row.id === editData.id) {
              return editData;
            }
            return row;
          });
          dispatch(updateUserDetails(updatedRowData));   
    }

    const handleDelete = delData =>{
        const updatedRowData = rowData.filter(row => row.id !== delData.id);
        dispatch(updateUserDetails(updatedRowData));
    }

    const getColDefs = row =>{
        const columns = Object.keys(row).map(k =>createCols(k));
        columns.push({
            headerName: 'Actions',
            cellRendererFramework: (params) => {
              return (
                <div>
                  {/* Edit Button */}
                  <button onClick={() => handleEdit(params.data)}>
                    <span role="img" aria-label="edit">&#x270E;</span> {/* ✎ */}
                  </button>
                  {/* Delete Button */}
                  <button onClick={() => handleDelete(params.data)}>
                    <span role="img" aria-label="delete">&#x1F5D1;</span> {/* 🗑 */}
                  </button>
                </div>
              );
            },
            // Set width to fit both buttons
            width: 100,
            // Disable sorting for action column
            suppressSorting: true,
          });
        columns.push({
            headerName: 'Checkbox',
            field: 'checkbox',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 250
        }) 
        //TODO::implement custom logic to select only rows of current page, on selecting checkbox of header. 
          return columns;
    } 

    const gridOptions = {
        defaultColDef: {
          resizable: true,
          sortable: true
        },
        pagination: true,
        paginationPageSize: 10
      };

    const headerView =(
        <header><h1>User Details</h1></header>
    );

    const deleteSelectedRows = () => {
      const selectedNodes = gridApi.getSelectedNodes();
      const selectedData = selectedNodes.map(node => node.data);
      let updatedRowData = rowData
      selectedData.forEach(item =>{
        updatedRowData = updatedRowData.filter(row => row.id !== item.id);
      });
      dispatch(updateUserDetails(updatedRowData));
    };

    const onFilterTextChange = (event) => {
      setSearchText(event.target.value);
      gridApi.setQuickFilter(event.target.value);
    };

    return(
        <MyComponent>
        <MyRowWrapper>{headerView}</MyRowWrapper>
        <div className="ag-theme-alpine" style={{ height: '100%', width: '100%' }}>
        <input type="text" onChange={onFilterTextChange} value={searchText} placeholder="Search..." style={{ padding: '10px', width: '60%', marginRight: '20px', marginLeft: '10px' }} />
        <button onClick={deleteSelectedRows} style={{ backgroundColor: 'blue', color: 'white',borderRadius: '10px', padding: '10px', width: '200px', height: '50px' }}>Delete Selected</button>
            <AgGridReact
                gridOptions={gridOptions}
                onGridReady={onGridReady}
                rowData = {rowData}
                columnDefs = {rowData.length > 0 ? getColDefs(rowData[0]):[]}
                rowSelection="multiple"
            />
        </div>
        </MyComponent>
    )
}

AdminUi.propTypes ={
};

export default AdminUi;

