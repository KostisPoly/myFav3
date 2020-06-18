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
import { addSong } from '../actions/profileActions';
import SimpleCard from './SimpleCard';

class AddSong extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiType: 'song',
            responseData: [],
            albumMore: {},
            artistMore: {},
            artist: {},
            album: {},
            id: '',
            title: '',
            link: '',
            duration: '',
            rank: '',
            preview: '',
            explicit: ''
        }

        this.onChange = this.onChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange(e, value) {
        console.log(e.target.value, value);
        console.log(value);
        if (value) {
            // if (value.show.image) {
            //     document.body.style.backgroundPosition = 'top';
            //     document.body.style.backgroundSize = 'cover';
            //     document.body.style.backgroundRepeat = 'no-repeat';
            //     document.body.style.backgroundImage = `url(${value.show.image.original})`;
            // } else {
            //     document.body.style.backgroundPosition = '';
            //     document.body.style.backgroundSize = '';
            //     document.body.style.backgroundRepeat = '';
            //     document.body.style.backgroundImage = '';
            // }


            this.setState({
                albumMore: value.album.tracklist,
                artistMore: value.artist.tracklist,
                artist: {
                    id: value.artist.id,
                    link: value.artist.link,
                    name: value.artist.name,
                    pictures: {
                        original: value.artist.picture,
                        big: value.artist.picture_big,
                        medium: value.artist.picture_medium,
                        small: value.artist.picture_small,
                        xl: value.artist.picture_xl
                    }
                },
                album: {
                    id: value.album.id,
                    title: value.album.title,
                    covers: {
                        original: value.album.cover,
                        big: value.album.cover_big,
                        medium: value.album.cover_medium,
                        small: value.album.cover_small,
                        xl: value.album.cover_xl
                    }
                },
                id: value.id,
                title: value.title,
                link: value.link,
                duration: value.duration,
                rank: value.rank,
                preview: value.preview,
                explicit: (value.explicit_lyrics ? 1 : 0)
            });
        }
        
    }

    onChange(e) {
        
        if (e.target.value.length > 3 ) {
            fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${e.target.value}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
                "x-rapidapi-key": "877f17a236mshcc764669bf2f219p1af399jsnc58083ed065e"
            }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data.data);
                //const responseTitles = data.titles;
                this.setState({
                    responseData: data.data
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
        const songData = {
            albumMore: this.state.albumMore,
            artistMore: this.state.artistMore,
            artist: {
                id: this.state.artist.id.toString(),
                link: this.state.artist.link,
                name: this.state.artist.name,
                pictures: {
                    original: this.state.artist.pictures.original,
                    big: this.state.artist.pictures.big,
                    medium: this.state.artist.pictures.medium,
                    small: this.state.artist.pictures.small,
                    xl: this.state.artist.pictures.xl
                }
            },
            album: {
                id: this.state.album.id.toString(),
                title: this.state.album.title,
                covers: {
                    original: this.state.album.covers.original,
                    big: this.state.album.covers.big,
                    medium: this.state.album.covers.medium,
                    small: this.state.album.covers.small,
                    xl: this.state.album.covers.xl
                }
            },
            id: this.state.id.toString(),
            title: this.state.title,
            link: this.state.link,
            duration: this.state.duration,
            rank: this.state.rank,
            preview: this.state.preview,
            explicit: this.state.explicit
        };

        this.props.addSong(songData, this.props.history);
        
        // document.body.style.backgroundPosition = '';
        // document.body.style.backgroundSize = '';
        // document.body.style.backgroundRepeat = '';
        // document.body.style.backgroundImage = '';
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
                    renderInput={(params) => <TextField {...params} label="Search Songs" variant="outlined" onChange={this.onChange} />}
                />
                <Button type="submit" variant="contained" size="large" color="secondary">ADD</Button>
                </form>
                
            </Typography>    
            </Container>
        )
    }
}

AddSong.propTypes = {
    addSong: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    profile:state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, { addSong })(withRouter(AddSong));