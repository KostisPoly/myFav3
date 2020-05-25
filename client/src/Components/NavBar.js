import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Typography, Button, Avatar } from "@material-ui/core";
import  MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authAction';
import { clearProfile } from '../actions/profileActions';

class NavBar extends Component {
    
    onLogout(e) {
        e.preventDefault();
        this.props.clearProfile();
        this.props.logoutUser();
        //window.location.href = '/login';
    }

    render() {

        const { isAuthenticated, user } = this.props.auth;

        //Logout button
        const isLogedIn = (
            <div>
                <Button component={Link} to="/login" onClick={this.onLogout.bind(this)} >Logout</Button>
                <Avatar alt={user.name} src={user.avatar}></Avatar>
            </div>
        );
        //Login and Signin    
        const isNotLogedIn = (
            <div>
            <Link className="" to="/register">
                Sign Up
            </Link>
            <Link className="" to="/login">
                Log In
            </Link>
            </div>
        );

        return (
            <AppBar position="static" color="secondary">
            <Toolbar variant="dense">
            <IconButton
                edge="start"
                color="primary"
                aria-label="menu"
            >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
            <Link to="/">
            MyFav3
            </Link>
            </Typography>
            {isAuthenticated ? isLogedIn : isNotLogedIn}
            </Toolbar>
            </AppBar>
        );
    }
}

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearProfile })(NavBar);
