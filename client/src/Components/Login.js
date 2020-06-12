import React, { Component } from 'react'
import { Button, FormControl, InputLabel, Input, InputAdornment, FormHelperText } from '@material-ui/core'
import { Email, Visibility } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Particle from './Particles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../actions/authAction';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            validPassword: false,
            validEmail: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);    
        this.onFocus = this.onFocus.bind(this);      
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onChange(e) {
        
        this.setState({ [e.target.name]: e.target.value});
        if (e.target.name === 'password') {
            
            if(e.target.value.length < 6) {
                this.setState({passwordError: 'Password must be at least 6 characters long!'});
                this.setState({validPassword: false});
            } else {
                this.setState({passwordError: ''});
                this.setState({validPassword: true});
            }
        } else {
            let regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if(regEx.test(e.target.value)) {

                this.setState({emailError: ''});
                this.setState({validEmail: true});
            } else {
                this.setState({emailError: 'Invalid Email'});
                this.setState({validEmail: false});
            }
        }
        
        
    }

    onFocus(e){
        if (!e.target.value) {
            (e.target.name === 'email') ? this.setState({emailError: 'Empty'}) : this.setState({passwordError: 'Empty'});
        }
        console.log(this.state);
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        if (this.state.validPassword && this.state.validEmail && this.state.emailError === ''  && this.state.passwordError === '' ) {
            console.log('Valid!');
            this.props.loginUser(user, this.props.history);//Use to redirect in loginuser action
        }
        
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
                        <FormControl error={this.state.emailError != ''} fullWidth={true} margin="dense">
                            <InputLabel htmlFor="email">Email address</InputLabel>
                            <Input id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                onFocus={this.onFocus}
                                aria-describedby="my-helper-text1" 
                                endAdornment={
                                    <InputAdornment position="end">
                                    <Email />
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText error={true} id="my-helper-text1">{this.state.emailError}</FormHelperText>
                        </FormControl>
                        <FormControl error={this.state.passwordError != ''} fullWidth={true} margin="dense">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                onFocus={this.onFocus}
                                aria-describedby="my-helper-text2"
                                endAdornment={
                                    <InputAdornment position="end">
                                    <Visibility />
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText error={true} id="my-helper-text2">{this.state.passwordError}</FormHelperText>
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
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth:state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
