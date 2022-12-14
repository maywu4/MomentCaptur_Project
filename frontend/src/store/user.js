import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./session";

export const RECEIVE_USER = 'user/fetchUser';
// export const UPDATE_CURRENT_USER = 'user/updateCurrentUser';


export const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

// const updateCurrentUser = (user) => ({
//     type: UPDATE_CURRENT_USER,
//     user
// });

export const getUser = (userId) => ({users}) => (users ? users[userId] : null )

export const fetchUser = (userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`);
    const data = await res.json();
    dispatch(receiveUser(data.user));
    return res;
}

export const updateUser = (user) => async dispatch => {
    const { username, email, firstName, lastName, age, password, about } = user;
    const res = await csrfFetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            username, 
            email, 
            firstName,
            lastName,
            age,
            password,
            about
        })
    });
    const data = await res.json();
    dispatch(receiveUser(data.user));
    return res;

};

//make update user cover & profile pic thunk action 

export const updateUserPics = (formData, userId) => async dispatch => {
    const res = await csrfFetch(`/api/users/${userId}`, {
        method: 'PATCH',
        body: formData
    });
    const data = await res.json();
    dispatch(receiveUser(data.user));
};




const userReducer = ( state = {}, action ) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            if (!action.user) return state;
        case RECEIVE_USER:
            return { ...state, [action.user.id]: action.user };
        default: 
            return state; 
    }
};

export default userReducer;