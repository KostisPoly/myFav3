import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import  MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

class NavBar extends Component {
    render() {
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
            <Link className="" to="/register">
                Sign Up
            </Link>
            <Link className="" to="/login">
                Log In
            </Link>
            </Toolbar>
            </AppBar>
        );
    }
}

export default NavBar;
