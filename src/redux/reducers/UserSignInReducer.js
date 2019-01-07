import { USER_SIGNIN } from '../actions/actionTypes';

const defaultState = {
    googleUser: {},
    googleAuthToken: {},
    signInFailedReason: ''
};

export default function UserSignInReducer(state = defaultState, action) {
  switch (action.type) {
    case USER_SIGNIN.SUCCESS:
      return {
        ...state,
        googleUser: action.payload.googleUser,
        googleAuthToken: action.payload.googleAuthToken
      };
    case USER_SIGNIN.ERROR:
      return {
        ...state,
        signInFailedReason: action.payload.signInFailedReason
      };
    case USER_SIGNIN.LOGOUT:
      return { ...defaultState }; // reset to default state on logout
    default:
      return state;
  }
}
