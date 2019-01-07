import { USER_SIGNIN } from '../actionTypes';

export const UserSignIn_onSuccess = payload => ({
    type: USER_SIGNIN.SUCCESS,
    payload
});

export const UserSignIn_onError = payload => ({
    type: USER_SIGNIN.ERROR,
    payload
});

export const UserSignIn_logOut = () => ({
    type: USER_SIGNIN.LOGOUT
});
