
import "./UserTable.scss";
import React, { useEffect } from 'react'
import useFetch from "react-fetch-hook";
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import { selectUser } from '../../Actions/user.tsx';
import { useDispatch, useSelector } from 'react-redux'
import { User } from "../../Models/user.ts";


const UserTable = () => {

    const dispatch = useDispatch();

    const actionExecuted = useSelector((state: any) => state.actionExecuted);

    const { isLoading, data, error } = useFetch(
        "https://gorest.co.in/public/v2/users"
    );

    useEffect(() => {
        console.log(actionExecuted);
    }, [actionExecuted]);



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

            const dataval: Array<any> = data as any;
            const selectedRowData: User = dataval.find((row) =>
                row.id == result[0]
            );
            dispatch(selectUser(selectedRowData));
        } else {

            setSelectionModel(selection);
            const dataval: Array<any> = data as any;
            const selectedRowData: User = dataval.find((row) =>
                row.id == selection[0]
            );
            dispatch(selectUser(selectedRowData));
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
