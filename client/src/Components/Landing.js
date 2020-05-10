import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class Landing extends Component {
    render() {
        return (
            <div>
                <Container disableGutters minWidth={1}>
                    <Typography 
                    style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    height: '100vh',
                    opacity: '0.7'}}>
                    Lorem whateva yo hello world
                    </Typography>
                </Container> 
            </div>
        )
    }
}

export default Landing;
