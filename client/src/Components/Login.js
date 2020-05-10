import React, { Component } from 'react'
import { Button, FormControl, InputLabel, Input, InputAdornment, FormHelperText } from '@material-ui/core'
import { Email, Visibility } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailError: '',
            passwordError: '',
            validPassword: false,
            validEmail: false,
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);      
    }

    onChange(e) {
        
        this.setState({ [e.target.name]: e.target.value});
        if (e.target.name === 'password') {
            if(e.target.value.length < 6) {
                this.setState({passwordError: 'Password must be at least 6 characters long!'});
                this.setState({validPassword: true});
            } else {
                this.setState({passwordError: ''});
                this.setState({validPassword: false});
            }
        } else {
            let regEx = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if(regEx.test(e.target.value)) {
                this.setState({emailError: ''});
                this.setState({validEmail: false});
            } else {
                this.setState({emailError: 'Invalid Email'});
                this.setState({validEmail: true});
            }
        }
        
        
    }

    onSubmit(e) {
        e.preventDefault();
    }

    render() {
        return (
            <Container disableGutters maxWidth={false}>
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
                        <FormControl error={this.state.validEmail} fullWidth={true} margin="dense">
                            <InputLabel htmlFor="email">Email address</InputLabel>
                            <Input id="email"
                                name="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                aria-describedby="my-helper-text1" 
                                endAdornment={
                                    <InputAdornment position="end">
                                    <Email />
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText error={true} id="my-helper-text1">{this.state.emailError}</FormHelperText>
                        </FormControl>
                        <FormControl error={this.state.validPassword} fullWidth={true} margin="dense">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
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

export default Login;
