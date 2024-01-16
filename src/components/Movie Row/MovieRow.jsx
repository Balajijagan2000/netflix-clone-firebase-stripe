import React, { useEffect,useState } from 'react';
import './MovieRow.css'
import axios from '../../helpers/axios'
import Loader from '../Loader/Loader';
import Fallback_img from '../../assets/img_placeholder.jpg'
const MovieRow = ({title,url,isPoster=false}) => {
    const [movies,setMovies] = useState([])
    const BASE_URL = 'https://image.tmdb.org/t/p/original/'
    const [isLoading,setLoading] = useState(true)
    useEffect(() => {
        
        const fetchMoviesByGenre = async () => {
            const res = await axios.get(url)
        
            setMovies([...res.data.results])
            setLoading(false)
            return res.data.results
        }
        fetchMoviesByGenre()
        
        
    },[])

    if(isLoading) {
        return (<Loader />);
    }
    return (
        <div className="row__container">
            <h1>{title}</h1>
            <div className="row">
            {
                movies.map((movie,idx) => {
                    return (
                            <div className="row__element">
                                <img 
                            src={`${BASE_URL}${isPoster ? movie.poster_path : movie.backdrop_path}`} 
                            key={movie.id}
                            loading='lazy'
                            onError={(e) => e.target.src=Fallback_img}
                            />

                            <div className="card__overlay" key={idx}>
                                <p>{`⭐ ${parseInt(movie?.vote_average).toFixed(1)}`}</p>
                                <p>
                                    {movie.name ? movie.name : movie.title}
                                </p>
                            </div>
                            </div>
                            
                       
                    )
                })
            }
            
             </div>
        </div>
    );
};


export default MovieRow;