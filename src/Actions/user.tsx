import { User } from "../Models/user";

// Action Creator
export const selectUser = (user: User) => {
    if (user) {
        // Return the action
        return {
            type: 'USER_SELECTED',
            payload: user
        }
    } else {
        // Return the action
        return {
            type: 'USER_SELECTED',
            payload: null
        }
    }
};
