import React, { Component } from 'react'
import { Button, FormControl, InputLabel, Input, FormHelperText, InputAdornment } from '@material-ui/core'
import { AccountCircle, Email, Visibility } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

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

export default Register;