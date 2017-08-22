/**
 * Created by serj on 7/26/17.
 */
import actionTypes from './../constants/actionsTypes'
import {put, takeEvery, call, all} from 'redux-saga/effects'
import $ from 'jquery';

const {CREATING_USER, DELETING_USER, GETTING_USERS_LIST, UPDATING_USER, CREATING_USER_SUCCESS, GETTING_USERS_LIST_SUCCESS, DELETING_USER_SUCCESS, UPDATING_USER_SUCCESS, USERS_FAILURE, GETTING_USER_SUCCESS, GETTING_USER} = actionTypes;

/* CREATE USER START */

const myHeaders = new Headers({
    "authorization": "Bearer sk_test_mgUtuLqIvANMsqtURVlQpJeq",
    "Content-Type":"application/x-www-form-urlencoded",
    'Accept': 'application/json',
});

const url = "https://api.stripe.com/v1/customers";

function createUser(user){
    let result =
        fetch(url,{
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body:$.param(user)
        }).then((response)=>response.json())
          .catch((e)=>console.log("error:", e));
    return result;

}

/* make work here  */
function* createUserAPI(action) {
    try {
        const data = yield createUser(action.payload);
        yield put({type: CREATING_USER_SUCCESS, data})
    } catch (e) {
        yield put({type: USERS_FAILURE})
    }
}

/* listen to creating user event */
function* createUsersSaga() {
    yield takeEvery(CREATING_USER, createUserAPI)
}

/* CREATE USER END */

/* LIST USERS START */

function getUsers(){
    let result =
        fetch(`${url}?limit=7`,{
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
        }).then((response)=>response.json())
            .catch((e)=>console.log("error:", e));
    return result;
};


/* make work here  */
function* getUsersAPI() {
    try {
        const data = yield getUsers();
        yield put({type: GETTING_USERS_LIST_SUCCESS, data});
    } catch (e) {
        yield put({type: USERS_FAILURE});
    }
}

function* getUsersSaga() {
    yield takeEvery(GETTING_USERS_LIST, getUsersAPI);
}
/* LIST USERS END  */
/* DELETE USER START */

function deleteUser(customerId){
    let result =
        fetch(`${url}/${customerId}`,{
            method: 'DELETE',
            headers: {
                "authorization": "Bearer sk_test_mgUtuLqIvANMsqtURVlQpJeq",
                'Accept': 'application/json',
            },
            mode: 'cors',
            cache: 'default',
        }).then((response)=>response.json())
            .catch((e)=>console.log("error:", e));
    return result;
};

function* deleteUserAPI(action) {
    try {
        const data = yield deleteUser(action.payload);
        yield put({type: DELETING_USER_SUCCESS, data});
    } catch (e) {
        yield put({type: USERS_FAILURE});
    }
}

function* deleteUserSaga() {
    yield takeEvery(DELETING_USER, deleteUserAPI);
}

/* DELETE USER END  */

 /* GET USER */

function getUser(customerId){
    let result =
        fetch(`${url}/${customerId}`,{
            method: 'GET',
            headers: {
                "authorization": "Bearer sk_test_mgUtuLqIvANMsqtURVlQpJeq",
                'Accept': 'application/json',
            },
            mode: 'cors',
            cache: 'default',
        }).then((response)=>response.json())
            .catch((e)=>console.log("error:", e));
    return result;
};

function* getUserAPI(action) {
    try {
        const data = yield getUser(action.payload);
        yield put({type: GETTING_USER_SUCCESS, data});
    } catch (e) {
        yield put({type: USERS_FAILURE});
    }
}

function* getUserSaga() {
    yield takeEvery(GETTING_USER, getUserAPI);
}

/*GET USER END */
/* UPDATE USER START */


function updateUser(user){
    let id = user.id;
    /* delete non needed keys */
    let nonNeededKeys = ["id", "object", "created", "currency", "sources", "subscriptions"];
    nonNeededKeys.map((el)=>{
        if(user[el])
            delete user[el];
    });
    /* i've allowed to pass these keys here because of id */

    let result =
        fetch(`${url}/${id}`,{
            method: 'POST',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default',
            body:$.param(user)
        }).then((response)=>response.json())
            .catch((e)=>console.log("error:", e));
    return result;

}

/* make work here  */
function* updateUserAPI(action) {
    try {
        const data = yield updateUser(action.payload);
        yield put({type: UPDATING_USER_SUCCESS, data})
    } catch (e) {
        yield put({type: USERS_FAILURE})
    }
}

/* listen to creating user event */
function* updateUsersSaga() {
    yield takeEvery(UPDATING_USER, updateUserAPI)
}

/* UPDATE USER END  */

export default function* sagas() {
    yield all([
        createUsersSaga(),
        getUsersSaga(),
        deleteUserSaga(),
        getUserSaga(),
        updateUsersSaga()
    ])
}
