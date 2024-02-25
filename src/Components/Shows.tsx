import React, { useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Movie, Show,  } from "./types";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


type ShowProps = {
  setMovie: (movie: Movie | null) => void;
  setShow: (show: Show | null) => void;
  useShow: Show | null;
}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false
  };


export function Shows(props: ShowProps) {

    const [popularShows, setpopularShows] = useState<Show[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    const navigate = useNavigate();

    useEffect (() => {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTM3ZWM1ZjRiMmM4ODA4NWU3YzhkYTg2ZDUzMjdlNiIsInN1YiI6IjY1ZDE4ZWMxYWE2NTllMDE4NjQzMjk5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5SjVl-XKJnnLoJ3z-_Fd-ZDFOTRiUUbLhM8gHTqrgnE'
            }
          };
          
         fetch(`https://api.themoviedb.org/3/trending/tv/week?language=en-US`, options)
            .then(response => response.json())
            .then(response => { setpopularShows(response.results); console.log(response.results)})
            .catch(err => console.error(err));
          
        }, [currentPage]);

        const handlePageChange = (pageNumber: number) => {
            setCurrentPage(pageNumber);
          };
          const handleShowSelect = (show: Show) => {
            props.setShow(show); // Set the movie ID in the state
            props.setMovie(null);
            console.log(props.useShow);
            navigate(`/watch/${show.id}`); // Navigate to the MovieWatch component
        };

        
    

  return (
    <div className="container mt-3">
        <div className="slider-container text-white mb-3 border-secondary border rounded-pill">
      <Slider {...settings} className="mb-4">
        {popularShows.slice(0, 5).map((show, index) => (
          <div key={show.id} className="mb-1">
            <img className="rounded-circle" src={`https://image.tmdb.org/t/p/w500/${show.backdrop_path}`} alt={`${show.name} slide`} style={{cursor: 'pointer'}} onClick={() => handleShowSelect(show)}/>
            <h6 className="text-white" style={{ textAlign: 'center' }}>{show.name}</h6>
          </div>
        ))}
      </Slider>
      </div>
     <div className="row align-items-center justify-content-center">
     <h3 className="text-white mt-3 mb-3"> Top of The Week</h3>
    {popularShows.map(show => (
        <div key={show.id} className="border-secondary col-md-2 mb-3 mx-2 text-white" style={{cursor: 'pointer'}} onClick={() => handleShowSelect(show)}>
        <img className="card-img-top rounded " src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}/>
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