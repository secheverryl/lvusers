import { combineReducers } from "redux";

const selectedUserReducer = (selectedUser = null, action) => {
    if (action.type === 'USER_SELECTED') {
        return action.payload;
    }

    return selectedUser;
}

export default combineReducers({
    selectedUser: selectedUserReducer
});