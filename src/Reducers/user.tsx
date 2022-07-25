import { combineReducers } from "redux";

const selectedUserReducer = (selectedUser = null, action) => {
    if (action.type === 'USER_SELECTED') {
        return action.payload;
    }

    return selectedUser;
}

const actionExecutedReducer = (actionExecuted = null, action) => {

    if (action.type === 'ACTION_EXECUTED') {
        return action.payload;
    }

    return actionExecuted;
}

export default combineReducers({
    selectedUser: selectedUserReducer,
    actionExecuted: actionExecutedReducer
});