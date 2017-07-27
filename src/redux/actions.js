/**
 * Created by serj on 7/26/17.
 */
import actionTypes from './../constants/actionsTypes'

export function createUser(userData) {
    return {
        type: actionTypes.CREATING_USER,
        payload: userData
    }
}

export function deleteUser(id) {
    return {
        type: actionTypes.DELETING_USER,
        payload: id
    }
}

export function getUsersList() {
    return {
        type: actionTypes.GETTING_USERS_LIST,
    }
}

export function updateUser(user) {
    return {
        type: actionTypes.UPDATING_USER,
        payload:user
    }
}

export function setUser(user){
    return {
        type: actionTypes.SET_CURRENT_USER,
        payload:user
    }
}

export function getUser(id){
    return {
        type: actionTypes.GETTING_USER,
        payload:id
    }
}
