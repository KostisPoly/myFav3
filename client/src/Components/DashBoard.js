import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../actions/profileActions';

class DashBoard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default connect(null, { getCurrentProfile })(DashBoard);