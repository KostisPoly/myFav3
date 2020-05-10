import React, { Component } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import  MenuIcon from '@material-ui/icons/Menu';

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
            MyFav3
            </Typography>
            </Toolbar>
            </AppBar>
        );
    }
}

export default NavBar;
