import React from 'react'
import { Link } from 'react-router-dom';


const ProfileActions = () => {
    return (
        <div>
            <Link to="/edit-profile">Edit Profile</Link>
            <Link to="/add-movie">My Movies</Link>
            <Link to="/add-show">My TV Shows</Link>
            <Link to="/add-song">My Songs</Link>
        </div>
    )
}

export default ProfileActions; 
