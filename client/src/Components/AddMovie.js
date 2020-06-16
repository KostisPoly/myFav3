import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button, Paper } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Particle from './Particles';
import Typography from '@material-ui/core/Typography';

import SimpleCard from './SimpleCard';

const isEmpty = require('lodash/isEmpty');

class AddMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: [],
            title: '',
            trailer: '',
            plot: '',
            id: '',
            year: '',
            length: '',
            rating: '',
            poster: ''
        }

        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e, value) {
        console.log(e.target.value, value);
        if (value) {
            document.body.style.backgroundPosition = 'top';
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
            document.body.style.backgroundImage = `url(${value.image})`;

            fetch(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/film/${value.id}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                    "x-rapidapi-key": "877f17a236mshcc764669bf2f219p1af399jsnc58083ed065e"
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    title: data.title,
                    trailer: data.trailer,
                    plot: data.plot,
                    id: data.id,
                    year: data.year,
                    length: data.length,
                    rating: data.rating,
                    poster: data.poster                                                  
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
        
    }

    onChange(e) {
        
        if (e.target.value.length > 3 ) {
            fetch(`https://imdb-internet-movie-database-unofficial.p.rapidapi.com/search/${e.target.value}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
                "x-rapidapi-key": "877f17a236mshcc764669bf2f219p1af399jsnc58083ed065e"
            }
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            const responseTitles = data.titles;
            //console.log(responseTitles);
            this.setState({
                responseData: responseTitles
            });
            //console.log(this.state);
        })
        .catch(err => {
            console.log(err);
        });
        }
        
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.state);
        document.body.style.backgroundPosition = '';
        document.body.style.backgroundSize = '';
        document.body.style.backgroundRepeat = '';
        document.body.style.backgroundImage = '';
    }

    render() {

        //const { errors } = this.state;
        const { errors } = this.props.errors;

        return (
            <Container disableGutters maxWidth={false}>
            <Particle />
            <Typography component={'div'}
                style={{ 
                background: 'linear-gradient(135deg, rgb(254, 107, 139, 0.5) 20%, rgb(255, 142, 83, 0.5) 70%)',
                minHeight: '100vh'
                }}>
                <SimpleCard card={this.state}/>
                <form
                onSubmit={this.onSubmit}
                noValidate
                style={{width: '50vw', textAlign: 'center', margin: '0 auto', paddingTop: '10vh'}}>
                <Autocomplete 
                    onChange={this.handleChange}
                    id="search-box"
                    options={this.state.responseData}
                    getOptionLabel = {(option) => option.title}
                    style={{ width: '50vw' }}
                    renderInput={(params) => <TextField {...params} label="Search Movie" variant="outlined" onChange={this.onChange} />}
                />
                <Button type="submit" variant="contained" size="large" color="secondary">Search</Button>
                </form>
                
            </Typography>    
            </Container>
        )
    }
}

AddMovie.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile:state.profile,
    errors: state.errors
});
export default connect(mapStateToProps)(withRouter(AddMovie));