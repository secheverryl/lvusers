
import "./UserTable.scss";
import React from 'react'
import useFetch from "react-fetch-hook";
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { selectUser } from '../../Actions/user.tsx';
import { useDispatch } from 'react-redux'


const UserTable = () => {

    const dispatch = useDispatch();

    const { isLoading, data, error } = useFetch(
        "https://gorest.co.in/public/v2/users"
    );

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'E-Mail', width: 300 },
        { field: 'gender', headerName: 'Gender', width: 100 },
        { field: 'status', headerName: 'Status', width: 100 }
    ];

    const [selectionModel, setSelectionModel] = React.useState<GridRowId[]>([]);

    const handleChange = (selection) => {
        if (selection.length > 1) {
            const selectionSet = new Set(selectionModel);
            const result = selection.filter((s) => !selectionSet.has(s));

            setSelectionModel(result);
            dispatch(selectUser(result));
        } else {
            setSelectionModel(selection);
            dispatch(selectUser(selection));
        }

    }

    return (
        <div className="user-table">
            <>
                <h1>Users</h1>
                {isLoading && <div>Data Loading...</div>}
                {error && (
                    <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                {data &&
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            rows={data as any[]}
                            columns={columns}
                            pageSize={5}
                            selectionModel={selectionModel}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            onSelectionModelChange={(ids) => { handleChange(ids) }}
                        />
                    </div>
                }
            </>
        </div>
    );
}

export default UserTable;
