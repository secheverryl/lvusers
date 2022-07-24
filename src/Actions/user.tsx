// Action Creator
export const selectUser = (id: number) => {
    // Return the action
    return {
        type: 'USER_SELECTED',
        payload: id
    }
};

export const userDataLoaded = (hasLoaded: boolean) => {
    // Return the action
    return {
        type: 'USER_DATA_LOADED',
        payload: hasLoaded
    }
};