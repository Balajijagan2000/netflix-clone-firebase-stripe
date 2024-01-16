import React, { useEffect, useState } from 'react';
import './Nav.css'
import Netflix_Logo from '../../assets/Netflix_logo.png'
import Netflix_Avatar from '../../assets/netflix_avatar.png'
import { useNavigate } from 'react-router-dom';


const Nav = () => {
    const navigate = useNavigate()
    const [showNav,setShowNav] = useState(true)
    const animateNav = (e) => {
        if(window.scrollY > 100) {
            setShowNav(false)
        } else {
            setShowNav(true)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll',animateNav)
        return () => window.removeEventListener('scroll',animateNav)
    },[])
    return (
        <nav className={`navbar ${!showNav ? 'hide': ''}`}>
            <img src={Netflix_Logo} 
                alt="Netflix Logo" 
                className="navbar__logo" 
                onClick={() => navigate('/')}
            />
            <img src={Netflix_Avatar} 
                onClick={() => navigate('/profile')}
                alt="Profile Avatar" 
                className="navbar__avatar" 
            />
        </nav>
    );
};

export default Nav;