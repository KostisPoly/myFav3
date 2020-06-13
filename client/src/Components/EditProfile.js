import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Particle from './Particles';
import { Button, FormControl, InputLabel, Input, FormHelperText, TextareaAutosize } from '@material-ui/core'
import { createProfile, getCurrentProfile } from '../actions/profileActions';
import { withRouter } from 'react-router-dom';

const isEmpty = require('lodash/isEmpty');

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            age: '',
            bio: '',
            profesion: '',
            errors: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        
        this.props.getCurrentProfile();
        console.log("This props ", this.props);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            console.log("error will receive");
            this.setState({ errors: nextProps.errors });
        }

        //If profile as props populate the component state profile and component variables
        if (nextProps.profile.profile) {
            console.log("nextprops will receive");
            console.log(nextProps);
            const profile = nextProps.profile.profile;
            profile.age = !isEmpty(profile.age) ? profile.age : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.profesion = !isEmpty(profile.profesion) ? profile.profesion : '';
            console.log(profile);
            this.setState({
                handle: profile.handle,
                age: profile.age,
                bio: profile.bio,
                profesion: profile.profesion
            });

        }
    }

    onSubmit(e) {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            age: this.state.age,
            bio: this.state.bio,
            profesion: this.state.profesion
        }
        this.props.createProfile(profileData, this.props.history);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    
    render() {

        const { errors } = this.props.errors;

        return (
            <div>
                <Container disableGutters maxWidth={false}>
                    <Particle />
                        <Typography  component={'div'}
                        style={{ 
                        background: 'linear-gradient(135deg, rgb(254, 107, 139, 0.5) 20%, rgb(255, 142, 83, 0.5) 70%)',
                        height: '90vh'
                        }}>
                            <form
                                onSubmit={this.onSubmit}
                                noValidate 
                                autoComplete="off" 
                                style={{width: '50vw', textAlign: 'center', margin: '0 auto', paddingTop: '10vh'}}>
                                <FormControl fullWidth={true} margin="dense">
                                    <InputLabel htmlFor="handle">Handle</InputLabel>
                                    <Input id="handle"
                                        name="handle"
                                        value={this.state.handle}
                                        onChange={this.onChange}
                                        aria-describedby="my-helper-text1"
                                    />
                                    <FormHelperText id="my-helper-text1">A unique handle for your profile e.g. username.</FormHelperText> 
                                </FormControl>
                                <FormControl fullWidth={true} margin="dense">
                                    <InputLabel htmlFor="age">BirthDate</InputLabel>
                                    <Input id="age"
                                        name="age"
                                        value={this.state.age}
                                        onChange={this.onChange}
                                        aria-describedby="my-helper-text2" 
                                    />
                                    <FormHelperText id="my-helper-text2">Your date of birth</FormHelperText> 
                                </FormControl>
                                <FormControl fullWidth={true} margin="dense">
                                    <TextareaAutosize name="bio" 
                                        id="bio" aria-label="minimum height" 
                                        rowsMin={4} 
                                        placeholder="So about me then..."
                                        onChange={this.onChange}
                                        value={this.state.bio}
                                        />
                                    <FormHelperText id="my-helper-text3">What others should now about you</FormHelperText> 
                                </FormControl>
                                <FormControl fullWidth={true} margin="dense">
                                    <InputLabel htmlFor="profesion">Profesion</InputLabel>
                                    <Input id="profesion"
                                        name="profesion"
                                        value={this.state.profesion}
                                        onChange={this.onChange}
                                        aria-describedby="my-helper-text4" 
                                    />
                                    <FormHelperText id="my-helper-text4">Your current work title or status.</FormHelperText> 
                                </FormControl>
                                <Button type="submit" variant="contained" size="large" color="secondary">
                                Submit
                                </Button>
                            </form>
                        </Typography>
                </Container>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile));
