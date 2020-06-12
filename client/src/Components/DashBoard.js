import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profileActions";
import Spinner from "../common/progressBar";
import Particle from './Particles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

class DashBoard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        //Logged in user has profile data or not
        if (profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            if (Object.keys(profile).length > 0){
                dashboardContent = <h4>{profile.user.name} - {profile.handle}</h4>;
            } else {
                dashboardContent = 
                <div>
                    <p>Welcome {user.name}</p>
                    <p>Please create your own personal profile</p>
                    <Link to="create-profile">Create my Profile</Link>
                </div>;
            }
            
        }

        return (
            <Container disableGutters maxWidth={false}>
                <Particle />
                <Typography component={'div'}
                style={{ 
                background: 'linear-gradient(135deg, rgb(254, 107, 139, 0.5) 20%, rgb(255, 142, 83, 0.5) 70%)',
                height: '90vh'
                }}>
                {dashboardContent}
                </Typography>
                
            </Container>
        );
    }
}

DashBoard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile })(DashBoard);
