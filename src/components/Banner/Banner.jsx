import React, { useEffect,useState } from 'react';
import './Banner.css'
import axios from '../../helpers/axios';
import requests from '../../helpers/apirequests';
import Loader from '../Loader/Loader';
const Banner = () => {
    const [banner,setBanner] = useState([])
    const [index,setIndex] = useState(0)
    const [isLoading,setLoading] = useState(true)
    
    const fetchBannerMovie = async () => {
        const res = await axios.get(requests.NetflixOriginals)
        
        
        setBanner([...res.data.results])
        setLoading(false)
        return res.data.results.length-1
    }
    const trimDesc = (desc,limit) => {
        if(desc == null || desc.length == 0) {
            return 'Loading....'
        } else {
            if(desc.length > limit) {
                return desc.substring(0,limit-1)+'...'
            } else {
                return desc
            }
        }
    }
    useEffect(() => {
        
        
       
        fetchBannerMovie()       
       
        
},[])
    useEffect(() => {
        
        const interval = setInterval(() => {
            
            
            if(index === banner.length-1) {
                setIndex(0)
            } else {
                setIndex(index+1)
            }

            
            
        },6000)
        return () => {
            clearInterval(interval)
        }
    },[index,banner])

    if(isLoading) {
        return (<Loader />)
    }
    return (
        
           
            
           
            <header className="banner" style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${banner[index]?.backdrop_path})`
            }}>
               
                    <div className="banner__contents">
                        <h1 className="banner__title">
                            {banner[index]?.name}
                        </h1>
                        <div className="banner__buttons">
                            <button>Play</button>
                            <button>My List</button>
                        </div>
                        <h2 className="banner__desc">
                            {trimDesc(banner[index]?.overview,130)
                        }
                        </h2>
                    </div>
                
                
            </header>
        
    );
};

export default Banner;