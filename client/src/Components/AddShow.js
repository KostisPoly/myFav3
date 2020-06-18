import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Button } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Particle from './Particles';
import Typography from '@material-ui/core/Typography';
import { addShow } from '../actions/profileActions';
import SimpleCard from './SimpleCard';

class AddShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiType: 'show',
            responseData: [],
            id: '',
            image: [],
            language: '',
            name: '',
            genres: [],
            network: '',
            officialSite: '',
            premiered: '',
            rating: '',
            status: '',
            summary: '',
            url: ''
        }

        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e, value) {
        console.log(e.target.value, value);
        console.log(value);
        if (value) {
            if (value.show.image) {
                document.body.style.backgroundPosition = 'top';
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundImage = `url(${value.show.image.original})`;
            } else {
                document.body.style.backgroundPosition = '';
                document.body.style.backgroundSize = '';
                document.body.style.backgroundRepeat = '';
                document.body.style.backgroundImage = '';
            }

            fetch(`https://api.tvmaze.com/shows/${value.show.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    id: data.id,
                    image: data.image,
                    language: data.language,
                    name: data.name,
                    genres: data.genres,
                    network: (data.network ? data.network.name : data.webChannel.name),
                    officialSite: data.officialSite,
                    premiered: data.premiered,
                    rating: data.rating.average,
                    status: data.status,
                    summary: data.summary,
                    url: data.url
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
        
    }

    onChange(e) {
        
        if (e.target.value.length > 3 ) {
            fetch(`https://api.tvmaze.com/search/shows?q=${e.target.value}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    responseData: data
                });
            })
            .catch(err => {
                console.log(err);
            });
        }
    }
    onSubmit(e) {
        //On submit dispatch action and redirect and remove background style
        e.preventDefault();
        console.log(this.state);
        const showData = {
            id: this.state.id.toString(),
            image: this.state.image,
            language: this.state.language,
            name: this.state.name,
            genres: this.state.genres,
            network: this.state.network,
            officialSite: this.state.officialSite,
            premiered: this.state.premiered,
            rating: this.state.rating,
            status: this.state.status,
            summary: this.state.summary,
            url: this.state.url
        };

        this.props.addShow(showData, this.props.history);
        
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
                    getOptionLabel = {(option) => option.show.name}
                    style={{ width: '50vw' }}
                    renderInput={(params) => <TextField {...params} label="Search TV Show" variant="outlined" onChange={this.onChange} />}
                />
                <Button type="submit" variant="contained" size="large" color="secondary">ADD</Button>
                </form>
                
            </Typography>    
            </Container>
        )
    }
}

AddShow.propTypes = {
    addShow: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile:state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, { addShow })(withRouter(AddShow));