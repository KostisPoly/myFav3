import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../actions/profileActions";
import Spinner from "../common/progressBar";

class DashBoard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashboardContent;

        if (profile === null || loading) {
            dashboardContent = <Spinner />
        } else {
            dashboardContent = <h4>Looaded contnnt</h4>;
        }

        return <div>{dashboardContent}</div>;
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
