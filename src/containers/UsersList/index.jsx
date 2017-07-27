import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/menu';
import Tables from './Tables';
import {getUsersList, deleteUser, setUser} from './../../redux/actions';
import { connect } from 'react-redux'
import {style} from './../generalPaperStyles';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const headers = [
    {name:"#", data_key:'id'},
    {name:"Email", data_key:'email'},
    {name:"First Name", data_key:'first_name'},
    {name:"Last Name", data_key:'last_name'},
    {name:"Description", data_key:'description'},
    {name:"Balance", data_key:'account_balance'},
];

class UsersList extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        selected: [],
        usersList:[],
        open:false
    };

    isSelected = (index) => {
        return this.state.selected && this.state.selected.indexOf(index) !== -1;
    };

    handleRowSelection = (selectedRows) => {
        this.setState({
            selected: selectedRows,
        });
    };

    handleUpdate = () => {
        let {history, setUser} = this.props;
        let selectedUser = this.getCurrentUser();
        history.push(`/users-update/${selectedUser.id}`);
    };

    getCurrentUser = () => {
        let getItemNumber = this.state.selected;
        if(getItemNumber.length === 0)
            return false;
        /* at this step we should have element selected, otherwise we will not have delete button */
        return this.state.usersList[getItemNumber];
    };

    handleDelete = () => {
        let selectedUser = this.getCurrentUser();
        this.props.deleteUser(selectedUser.id);
        /* unselect */
        this.setState({
            selected:[]
        });

    };

    componentDidMount(){
        this.props.getUsersList();
    }

    componentWillReceiveProps(newProps){

        let {users_list:usersList=[], deleted} = newProps.users;
        if(usersList.length > 0){
            /* add to users list first last name  */
            usersList = usersList.map((userItem)=>{
                /* get users name and last name */
                let {first_name="", last_name=""} = userItem.metadata;
                return {
                    ...userItem,
                    first_name,
                    last_name
                }
            })
        }
        this.setState({
            usersList
        });
        /* if */
        if(deleted=='ok'){
            this.handleOpen();
        }
    }
    /* code duplication, but in simple applications i don't think that it is a problem */
    /* dialog actions */
    handleClose = () => {
        this.setState({open: false});
        this.props.getUsersList();
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    render() {
        let selected = this.state.selected;
        /* indicate loading */
        let {status} = this.props.users;
        if(status == 'pending'){
            status = <CircularProgress />;
        }
        /* dynamically insert menu */
        let menu = <p>Select user to be able to perform actions  {status}</p>;

        if(selected && selected.length > 0){
            menu = <span><span style={{position:"relative", top:"-6px"}}>Actions:</span><IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                <MenuItem onTouchTap={this.handleUpdate} primaryText="Update" />
                <MenuItem onTouchTap={this.handleDelete} primaryText="Delete" />
            </IconMenu></span>;
        }

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
            <Paper style={style} zDepth={3}>
                {menu}
            </Paper>
            <Paper style={style} zDepth={3}>
                <Tables
                    handleRowSelection={this.handleRowSelection}
                    headers={headers}
                    sampleArray={this.state.usersList}
                    selected={this.isSelected}
                />
            </Paper>
            <Dialog
                title={`User was deleted`}
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                User was deleted successfully.
            </Dialog>
        </div>
    }

}



export default connect((store)=> ({
    users:store.users
}),{getUsersList, deleteUser, setUser})(UsersList);

