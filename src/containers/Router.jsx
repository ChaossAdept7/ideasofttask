import React, {Component, PropTypes} from 'react';
import {Route} from 'react-router-dom';
import CreateUser from './CreateUser/CreateUser'
import UsersList from './UsersList'

const Router = () => (<div className="app_container">
    <Route exact path="/" component={UsersList} />
    <Route path="/users-create" component={CreateUser} />
    <Route path="/users-update/:id" component={CreateUser} />
</div>);

export default Router;

