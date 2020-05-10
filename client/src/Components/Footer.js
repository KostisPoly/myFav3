import React, { Component } from 'react'
import Box from '@material-ui/core/Box';

class Footer extends Component {
    render() {
        return (
            <div style={{ width: '100%' }}>
                <Box display="flex" p={1} bgcolor="secondary.main" color="secondary.contrastText">
                    Copyright &copy; {new Date().getFullYear()} MyFav3
                </Box>
            </div>
        )
    }
}

export default Footer;
