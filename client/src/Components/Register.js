import React, { Component } from 'react'
import { Button, FormControl, InputLabel, Input, FormHelperText, InputAdornment } from '@material-ui/core'
import { AccountCircle, Email, Visibility } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { registerUser } from '../actions/authAction';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Particle from './Particles';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);      
    }

    onChange(e) {
        //console.log(e.target.value);
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();

        //user object from component state
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        this.props.registerUser(newUser, this.props.history);//Use to redirect in registeruser action
        // Axios.post('/api/users/register', newUser)
        //     .then(res => console.log(res.data))
        //     .catch(err => console.log(err.response.data));
    }

    render() {
        //user and errors from redux props
        const { user } = this.props.auth;
        const { errors } = this.props.errors;

        return (
            <Container disableGutters maxWidth={false}>
                <Particle />
                <Typography component={'div'}
                style={{ 
                background: 'linear-gradient(45deg, rgb(254, 107, 139, 0.5) 20%, rgb(255, 142, 83, 0.5) 70%)',
                height: '90vh'
                }}>
                    <form
                        onSubmit={this.onSubmit}
                        noValidate 
                        autoComplete="off" 
                        style={{width: '50vw', textAlign: 'center', margin: '0 auto', paddingTop: '10vh'}}>
                        <FormControl fullWidth={true} margin="dense">
                            <InputLabel htmlFor="name">Full Name</InputLabel>
                            <Input id="name"
                                name="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                aria-describedby="my-helper-text1" 
                                endAdornment={
                                    <InputAdornment position="end">
                                    <AccountCircle />
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="my-helper-text1">Who is this?.</FormHelperText> 
                        </FormControl>
                        <FormControl fullWidth={true} margin="dense">
                            <InputLabel htmlFor="email">Email address</InputLabel>
                            <Input id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                aria-describedby="my-helper-text2" 
                                endAdornment={
                                    <InputAdornment position="end">
                                    <Email />
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="my-helper-text2">We'll never share your email.</FormHelperText> 
                        </FormControl>
                        <FormControl fullWidth={true} margin="dense">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                aria-describedby="my-helper-text3"
                                endAdornment={
                                    <InputAdornment position="end">
                                    <Visibility />
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="my-helper-text3">Something rather strong please!</FormHelperText> 
                        </FormControl>
                        <FormControl fullWidth={true} margin="dense">
                            <InputLabel htmlFor="password2">Confirm Password</InputLabel>
                            <Input id="password2"
                                name="password2"
                                value={this.state.password2}
                                onChange={this.onChange}
                                aria-describedby="my-helper-text4" 
                                endAdornment={
                                    <InputAdornment position="end">
                                    <Visibility />
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText id="my-helper-text4">Again please!.</FormHelperText> 
                        </FormControl>
                        <Button type="submit" variant="contained" size="large" color="secondary">
                        Register
                        </Button>
                    </form>
                </Typography>
            </Container>    
            
        )
    }
}

//Typechecking props with proptypes and passing state to props
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));