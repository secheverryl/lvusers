
import "./ButtonMenu.scss";
import React, { useEffect } from 'react'
import { Button, TextField, Select, SelectChangeEvent, FormControl, MenuItem, InputLabel } from '@mui/material';
import { useSelector } from 'react-redux'
import { User } from '../../Models/user.ts';
import user from "../../Reducers/user";
import { createTheme } from '@mui/material/styles';

const UserTable = () => {


    const selectedUser = useSelector((state: any) => state.selectedUser);
    const [userData, setUserData] = React.useState<User>(new User());

    const deleteUser = () => {
        if (selectedUser && selectedUser.length) {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer 750e5cf1cdca89376ffc26ffcc9167ba8c3eedbecb63b19193111b7d27880a17',
                    'My-Custom-Header': 'usersebas'
                }
            };

            // DELETE request using fetch with error handling
            fetch('https://gorest.co.in/public/v2/users/' + selectedUser[0], requestOptions)
                .then(async response => {
                    const data = await response.json();
                    console.log('data.status', data);
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }

    const addUser = () => {

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 750e5cf1cdca89376ffc26ffcc9167ba8c3eedbecb63b19193111b7d27880a17',
                'My-Custom-Header': 'usersebas'
            },
            body: JSON.stringify(userData)
        };

        // POST request using fetch with error handling
        fetch('https://gorest.co.in/public/v2/users/', requestOptions)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }

    const updateUser = () => {
        if (selectedUser && selectedUser.length) {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 750e5cf1cdca89376ffc26ffcc9167ba8c3eedbecb63b19193111b7d27880a17',
                    'My-Custom-Header': 'usersebas'
                },
                body: JSON.stringify(userData)
            };

            // POST request using fetch with error handling
            fetch('https://gorest.co.in/public/v2/users/' + selectedUser[0], requestOptions)
                .then(async response => {
                    const data = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }

    const handleName = (event) => {
        setUserData({
            ...userData,
            ...{ name: event.target.value as string }
        });
    };

    const handleEmail = (event) => {
        setUserData({
            ...userData,
            ...{ email: event.target.value as string }
        });
    };

    const handleGender = (event: SelectChangeEvent) => {
        setUserData({
            ...userData,
            ...{ gender: event.target.value as string }
        });
    };

    const handleStatus = (event: SelectChangeEvent) => {
        setUserData({
            ...userData,
            ...{ status: event.target.value as string }
        });
        console.log(userData);
    };


    return (
        <>
            <div className="button-menu">
                <Button className="buttton-element" variant="contained" onClick={addUser}>Add</Button>
                <Button className="buttton-element" variant="contained" disabled={selectedUser ? selectedUser.length === 0 : true} onClick={deleteUser}>Delete</Button>
                <Button className="buttton-element" variant="contained" disabled={selectedUser ? selectedUser.length === 0 : true} onClick={updateUser}>Update</Button>
            </div>
            <div className="user-fields">
                <TextField required id="user-name" onChange={handleName} label="User Name" className="buttton-element" />
                <TextField id="user-email" onChange={handleEmail} label="E-mail" className="buttton-element" />
                <FormControl className="buttton-element">
                    <InputLabel id="gender-select-label">Gender</InputLabel>
                    <Select labelId="gender-select-label" id="gender-select" value={userData.gender} label="Gender" onChange={handleGender}>
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className="buttton-element">
                    <InputLabel id="status-select-label">Status</InputLabel>
                    <Select labelId="status-select-label" id="status-select" value={userData.status} label="Status" onChange={handleStatus}>
                        <MenuItem value={'active'}>Active</MenuItem>
                        <MenuItem value={'inactive'}>Inactive</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </>
    );
}

export default UserTable;
