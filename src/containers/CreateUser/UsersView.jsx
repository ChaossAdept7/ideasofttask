import React, {Component, PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const UsersView = ({createUser, handleStateChange, userData={}, isUpdate}) => {
    return <div className="users_root">
        <div className="row_inputs">
            <div className="row">
                <TextField
                    hintText="Enter First Name"
                    floatingLabelText="First Name"
                    name="first_name"
                    onChange={handleStateChange}
                    value={userData.first_name}
                />
            </div>
            <div className="row">
                <TextField
                    hintText="Enter Last Name"
                    floatingLabelText="Last Name"
                    name="last_name"
                    onChange={handleStateChange}
                    value={userData.last_name}
                />
            </div>
            <div className="row">
                <TextField
                    hintText="Enter Description"
                    floatingLabelText="Description"
                    name="description"
                    onChange={handleStateChange}
                    value={userData.description}
                />
            </div>
            <div className="row">
                <TextField
                    hintText="Enter Balance"
                    floatingLabelText="Balance"
                    name="account_balance"
                    onChange={handleStateChange}
                    value={userData.account_balance}
                />
            </div>
            <div className="row">
                <TextField
                    hintText="Enter Email"
                    floatingLabelText="Email"
                    name="email"
                    onChange={handleStateChange}
                    value={userData.email}
                />
            </div>
        </div>
        <div className="buttons">
            <RaisedButton style={{
                margin: 20,
            }}
                          label={isUpdate}
                          primary={true}
                          onTouchTap={createUser}
            />
        </div>
    </div>
};

export default UsersView;

