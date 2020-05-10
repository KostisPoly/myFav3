import React, { Component } from 'react'
import { Button, FormControl, InputLabel, Input, InputAdornment } from '@material-ui/core'
import { Email, Visibility } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
