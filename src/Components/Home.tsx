import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Movie, Show } from "./types";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { options } from "../apikey";

type MovieProps = {
  setMovie: (movie: Movie | null) => void;
  setShow: (show: Show | null) => void;
  useMovie: Movie | null;
}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    waitForAnimate: false
  };


export function Home(props: MovieProps) {

    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect (() => {
         fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US`, options)
            .then(response => response.json())
            .then(response => { setPopularMovies(response.results); console.log(response.results)})
            .catch(err => console.error(err));
          
        }, [currentPage]);

        const handlePageChange = (pageNumber: number) => {
            setCurrentPage(pageNumber);
          };
          const handleMovieSelect = (movie: Movie) => {
            props.setMovie(movie); // Set the movie ID in the state
            props.setShow(null);
            console.log(props.useMovie);
            navigate(`/watch/${movie.id}`); // Navigate to the MovieWatch component
        };

        
    

  return (
    <div className="container mt-3">
        <div className="slider-container text-white mb-3 border-secondary border rounded-pill">
      <Slider {...settings} className="mb-4">
        {popularMovies.slice(0, 5).map((movie, index) => (
          <div key={movie.id} className="mb-4">
            <img className="rounded-circle" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt={`${movie.title} slide`} style={{cursor: 'pointer'}} onClick={() => handleMovieSelect(movie)}/>
            <h6 className="text-white" style={{ textAlign: 'center' }}>{movie.title}</h6>
          </div>
        ))}
      </Slider>
      </div>
     <div className="row align-items-center justify-content-center">
        <h3 className="text-white mt-3 mb-3"> Top of The Week</h3>
    {popularMovies.map(movie => (
        <div key={movie.id} className="border-secondary col-md-2 mb-3 mx-2 text-white" style={{cursor: 'pointer'}} onClick={() => handleMovieSelect(movie)}>
        <img className="card-img-top rounded " src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
            <div className="card-body">
        
          {/* Render other movie details as needed */}
          </div>
        </div>
      ))}
      </div>
      <div className="justify-content-center">
      {/* <Pagination className="bg-dark">
        <Pagination.First className="bg-dark" onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev className="bg-dark" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
        
        <Pagination.Next className="bg-dark" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === 42520} />
        <Pagination.Last onClick={() => handlePageChange(42520)} disabled={currentPage === 42520} />
      </Pagination> */}
      </div>
    </div>
  );
}