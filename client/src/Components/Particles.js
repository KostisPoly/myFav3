import React, { Component } from 'react'
import '../App.css';
import Particles from "react-particles-js";
import png1 from '../assets/deezer-logo.png';
import png2 from '../assets/social-media.png';
import png3 from '../assets/social.png';
import png4 from '../assets/tvm-header-logo.png';

const params = {
    particles: {
        shape: {
            type: 'images',
            image: [
                {
                    src: `${png1}`
                },
                {
                    src: `${png2}`
                },
                {
                    src: `${png3}`
                },
                {
                    src: `${png4}`
                }
            ]
            
        },
        size: {
            value: 25
        }
    }
}

export default class Particle extends Component {
    render() {
        return (
            <div>
                <Particles
                        className="particles"
                        params={ params }
                    />
            </div>
        )
    }
}
