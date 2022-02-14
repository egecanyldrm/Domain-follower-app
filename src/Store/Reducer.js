const INITIAL_STATE = {
    login_status: false
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'access_user':
            return {
                ...state,
                login_status: true
            }

        default:
            return state;
    }
}

export default reducer;