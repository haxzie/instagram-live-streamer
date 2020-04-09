import { combineReducers } from "redux";
import { types } from "./actions";

function user (state = { profile: null }, action) {
    switch (action.type) {
        case types.SET_USER_PROFILE:
            return {...state, profile: action.profile};
        default:
            return state
    }
}

function auth (state = { isLoggedIn: false }, action) {
    switch (action.type) {
        case types.SET_SIGNED_IN:
            return {...state, isLoggedIn: action.flag };
        default:
            return state;
    }
}

const InstagramUser = combineReducers({
    user,
    auth
});

export default InstagramUser;