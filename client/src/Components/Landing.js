import React, { Component } from 'react'
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Particle from './Particles';

const LinkBehavior = React.forwardRef((props, ref) => (
    <RouterLink ref={ref}  {...props} />
));

class Landing extends Component {
    render() {
        return (
            <div>
                <Container disableGutters maxWidth={false}>
                    <Particle />
                    <Typography 
                    style={{ 
                    background: 'linear-gradient(45deg, rgb(254, 107, 139, 0.5) 20%, rgb(255, 142, 83, 0.5) 70%)',
                    height: '90vh'
                    }}>
                    Lorem whateva yo hello world
                    <Button size="large" color="secondary" to="/register" component={LinkBehavior}>Sign Up</Button>
                    <Button size="large" color="secondary" component={LinkBehavior} to="/login">Log In</Button>
                    </Typography>
                </Container> 
            </div>
        )
    }
}

export default Landing;
