
import "./ButtonMenu.scss";
import React, { useEffect } from 'react'
import { Button, TextField, Select, SelectChangeEvent, FormControl, MenuItem, InputLabel, Modal, Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux'
import { User } from '../../Models/user.ts';
import user from "../../Reducers/user";
import { createTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserTable = () => {


    const selectedUser = useSelector((state: any) => state.selectedUser);
    const [userData, setUserData] = React.useState<User>(new User());
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setUserData({
            ...selectedUser
        });
    }, [selectedUser]);

    const deleteUser = () => {
        if (selectedUser) {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer 750e5cf1cdca89376ffc26ffcc9167ba8c3eedbecb63b19193111b7d27880a17',
                    'My-Custom-Header': 'usersebas'
                }
            };

            // DELETE request using fetch with error handling
            fetch('https://gorest.co.in/public/v2/users/' + selectedUser.id, requestOptions)
                .then(async response => {
                    const data = await response.json();
                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        toast('There was an error!: ' + data[0].field + " - " + data[0].message);
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    toast('User deleted');
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
                    console.log(data);
                    toast('There was an error!: ' + data[0].field + " - " + data[0].message);
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                toast('User added');
            })
            .catch(error => {
                console.error('There was an error!', error);
            });

    }

    const updateUser = () => {
        if (selectedUser) {
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
            fetch('https://gorest.co.in/public/v2/users/' + selectedUser.id, requestOptions)
                .then(async response => {
                    const data = await response.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response status
                        toast('There was an error!: ' + data[0].field + " - " + data[0].message);
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }
                    toast('User updated');
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

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <ToastContainer />
            <div className="button-menu">
                <Button className="buttton-element" variant="contained" onClick={addUser}>Add</Button>
                <Button className="buttton-element" variant="contained" disabled={selectedUser ? false : true} onClick={deleteUser}>Delete</Button>
                <Button className="buttton-element" variant="contained" disabled={selectedUser ? false : true} onClick={handleOpen}>Update</Button>
            </div>
            <div className="user-fields">
                <TextField required id="user-name" value={userData.name} onChange={handleName} label="User Name" className="buttton-element" />
                <TextField id="user-email" value={userData.email} onChange={handleEmail} label="E-mail" className="buttton-element" />
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
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField required id="user-name" value={userData.name} onChange={handleName} label="User Name" className="buttton-element" />
                    <TextField id="user-email" value={userData.email} onChange={handleEmail} label="E-mail" className="buttton-element" />
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
                    <Button className="buttton-element-modal" variant="contained" onClick={updateUser}>Update</Button>
                </Box>
            </Modal>
        </>
    );
}

export default UserTable;
