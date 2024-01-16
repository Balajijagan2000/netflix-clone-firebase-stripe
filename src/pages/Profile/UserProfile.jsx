import Nav from '../../components/Navbar/Nav';
import './UserProfile.css'
import React from 'react';
import Netflix_Avatar from '../../assets/netflix_avatar.png'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseconfig';
import Plan from '../../components/Plans/Plan';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';

const UserProfile = () => {
    const user = useSelector(selectUser)
    return (
        <section className="profile-wrapper">
        <Nav />
        <div className="profile__main">
            <h1>Edit Profile</h1>

            <div className="profile__info-wrapper">
                <img src={Netflix_Avatar} alt="" />

                <div className="profile__info">
                    <h2>{user.email}</h2>

                    <div className="profile__plans">
                        <h3>Plans</h3>
                        <Plan />
                        <button onClick={() =>signOut(auth)}>Sign Out</button>
                    </div>
                </div>
                
            </div>
        </div>
        </section>
    );
};

export default UserProfile;