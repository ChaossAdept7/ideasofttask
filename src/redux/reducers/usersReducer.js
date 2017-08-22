/**
 * Created by serj on 7/26/17.
 */
let usersReducer = function(users={success:false, status:"new"}, action) {
    switch (action.type) {
        case 'GETTING_USERS_LIST':
        case 'CREATING_USER':
        case 'DELETING_USER':
        case 'GETTING_USER':
        case 'UPDATING_USER':
            return {
                ...users,
                status:"pending",
                deleted:false,
                selected_user:{},
                created:false,
                updated:false,
                action:""
            };
            break;
        case 'GETTING_USERS_LIST_FAILURE':
        case 'CREATING_USER_FAILURE':
        case 'DELETING_USER_FAILURE':
            return {
                ...users,
                status:"done",
                success:false,
                deleted:false
            };
            break;
        case 'CREATING_USER_SUCCESS':
        case 'UPDATING_USER_SUCCESS':
            let data = action.data;

            let objToReturn = {
                ...users,
                new_user:action.data,
                success:false,
                status:"done",
                created:false
            };
            /* success case */
            if(data && data.id){
                objToReturn = {
                    ...users,
                    new_user:action.data,
                    success:true,
                    status:"done",
                    created:true
                };
            }

            return objToReturn;
            break;
        case 'GETTING_USERS_LIST_SUCCESS':
            /* success case */
            return {
                ...users,
                users_list:action.data.data,
                success:true,
                status:"done",
                deleted:false
            };
            break;
        case 'DELETING_USER_SUCCESS':
            return {
                ...users,
                deleted:"ok",
                success:true,
                status:"done"
            };
            break;
        case 'SET_CURRENT_USER':
            return {
                ...users,
                selected_user:action.payload
            };
            break;
        case 'GETTING_USER_SUCCESS':
            return {
                ...users,
                selected_user:action.data,
                success:true,
                status:"done"
            };
            break;
        default:
            return users;
    }
};

export default usersReducer
