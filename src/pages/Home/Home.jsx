import React from 'react';
import Nav from '../../components/Navbar/Nav';
import Banner from '../../components/Banner/Banner';
import MovieRow from '../../components/Movie Row/MovieRow';
import requests from '../../helpers/apirequests';
import './Home.css'


const Home = () => {
    return (
        <>
            <Nav />
            <Banner />
            <div className="fade"></div>
            <MovieRow 
                title="Netflix Originals"
                url={requests.NetflixOriginals}
                isPoster={true}
            />

    <MovieRow title="Trending Now" url={requests.Trending} isPoster={false} />
      <MovieRow title="Top Rated" url={requests.TopRated} isPoster={false} />
      <MovieRow title="Action Movies" url={requests.ActionMovies} isPoster={false} />
      <MovieRow title="Comedy Movies" url={requests.ComedyMovies} isPoster={false} />
      <MovieRow title="Horror Movies" url={requests.HorrorMovies} isPoster={false} />
      <MovieRow title="Romance Movies" url={requests.RomanceMovies} isPoster={false} />
      <MovieRow title="Documentaries" url={requests.Documentaries} isPoster={false} /> 
        
         
        </>
        

    );
};

export default Home;