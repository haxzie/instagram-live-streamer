export const types = {
    SET_USER_PROFILE: "SET_USER_PROFILE",
    SET_SIGNED_IN: "SET_SIGNED_IN",
    SET_IG_CLIENT: "SET_IG_CLIENT"
}

export function setUserProfile(profile) {
    return { type: types.SET_USER_PROFILE, profile}
}

export function setIgClient(client) {
    return { type: types.SET_IG_CLIENT, client };
}

export function setSignedIn(flag) {
    return { type: types.SET_SIGNED_IN, flag}
}