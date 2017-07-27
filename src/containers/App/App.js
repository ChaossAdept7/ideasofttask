import React, {Component} from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import AppBar from 'material-ui/AppBar';
import Router from './../Router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Route , Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux'

const muiTheme = getMuiTheme(lightBaseTheme);


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <AppBar onLeftIconButtonTouchTap={this.handleToggle} />
                    <Router />
                    <Drawer
                        docked={false}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <MenuItem onTouchTap={this.handleClose}>
                            <Link to={`/`}>Users List</Link>
                        </MenuItem>
                        <MenuItem onTouchTap={this.handleClose}>
                            <Link to={`/users-create`}>Create User</Link>
                        </MenuItem>
                    </Drawer>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withRouter(connect((store)=>({
    users:store.users
}))(App));
