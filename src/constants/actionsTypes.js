import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
    "CREATE_USER",
    "LOGIN",
    "CREATING_USER",
    "USERS_FAILURE",
    "CREATING_USER_SUCCESS",
    "GETTING_USERS_LIST",
    "GETTING_USERS_LIST_SUCCESS",
    "DELETING_USER",
    "DELETING_USER_SUCCESS",
    "UPDATING_USER",
    "UPDATING_USER_SUCCESS",
    "SET_CURRENT_USER",
    "GETTING_USER",
    "GETTING_USER_SUCCESS",
]);

export default actionTypes;