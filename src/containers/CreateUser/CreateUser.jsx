import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import {style} from './../generalPaperStyles';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import './style.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {handleStateChange} from './../stateHandlers';
import UsersView from './UsersView';
import {createUser, getUser, updateUser} from './../../redux/actions';
import { connect } from 'react-redux'

class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.handleStateChange = handleStateChange.bind(this, 'userData');
    }

    state = {
        open: false,
        userData:{},
        isUpdate:false
    };

    message = 'User was created';
    title = "User was created successfully";
    runAfterPopUpCloses = null;

    /* code duplication, but in simple applications i don't think that it is a problem */
    /* dialog actions */
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
        /* check presence */
        if(this.runAfterPopUpCloses)
            /* run if present */
            this.runAfterPopUpCloses();
    };

    createUser = () => {
        /* reformat users array to create valid object */
        let user = this.state.userData;
        let {last_name, first_name} = user;

        if (!last_name || !first_name ){
            this.message = 'Enter information';
            this.title = "Enter at least last name or first name";
            this.runAfterPopUpCloses = null;
            this.handleOpen();
            return false;
        }
        user.metadata = {
            first_name,
            last_name
        };

        /* server will return error about unknown keys */
        delete user.first_name;
        delete user.last_name;

        if(this.state.isUpdate){
            /* remove empty fields */
            Object.keys(user).map((key)=>{
                if(!user[key])
                    delete user[key];
            });
            /* set dialog headers */
            this.message = 'User was updated';
            this.title = "User was updated successfully";
            this.props.updateUser(user);
                    /* redirrect to users list */
        }else{
            /* set dialog headers */
            this.message = 'User was created';
            this.title = "User was created successfully";
            this.props.createUser(user);
        }
    };

    componentWillReceiveProps(newProps){
        let {status, created} = newProps.users;
        /* if user was created - show dilog with info */
        if(created &&  status == "done"){
            /* set after close function and open dialog */
            this.runAfterPopUpCloses = ()=>this.props.history.push('/');
            this.handleOpen();
        }

        /* check if update */
        let {id} = this.props;

        if(id && id.length > 0){
            let {selected_user:userData, status, success} = newProps.users;
            /* to pass to our inputs data we need to remake it */
            if(userData && status == "done" && success){

                let {first_name="", last_name=""} = userData.metadata;

                userData = {
                    ...userData,
                    first_name,
                    last_name
                };
            }
            this.setState({
                userData
            });
        }
    }

    componentDidMount(){
        /* update case */
        let {id} = this.props;
        /* init update*/
        if(id && id.length > 0){
            this.props.getUser(id);
            this.setState({
                isUpdate:true
            });
        }
    }

    render() {
        /* dialog button */
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleClose}
            />,
        ];

        return <div>
            <Paper style={style}>
                <UsersView
                    createUser={this.createUser}
                    handleStateChange = {this.handleStateChange}
                    userData = {this.state.userData}
                    isUpdate = {(this.props.id && this.props.id.length>0)? 'Update User':'Create User'}
                />
                <Dialog
                    title={this.title}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {this.message}
                </Dialog>
            </Paper>
        </div>
    }

}

export default connect((store, ownProps)=> {
    let {id=''} = ownProps.match.params;
    if(id && id.length > 0 ){
        return {
            users:store.users,
            id
        }
    }else {
        return {
            users: store.users
        }
    }

}, {createUser, getUser, updateUser})(CreateUser);

