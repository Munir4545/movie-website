import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Movie, Show } from "./types";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { options } from "../apikey";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
  waitForAnimate: false,
  variableWidth: true,
  variableHeight: true,
};


export function Home(props: MovieProps) {

  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [isSearching, SetIsSearching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/trending/movie/week?language=en-US`, options)
      .then(response => response.json())
      .then(response => { SetIsSearching(false); setPopularMovies(response.results); console.log(response.results); })
      .catch(err => console.error(err));
  }, []);

  const handleMovieSelect = (movie: Movie) => {
    props.setMovie(movie); // Set the movie ID in the state
    props.setShow(null);
    console.log(props.useMovie);
    navigate(`/watch/movie/${movie.id}-${movie.title}`); // Navigate to the MovieWatch component
  };




  return (
    <>
      {isSearching && <FontAwesomeIcon icon={faSpinner} spin size="5x" aria-label="Loading..." aria-hidden="false" />}
      {!isSearching &&
        <div className="container">
          <div className="slider-container text-white mb-3 scrollwheel rounded">
            <Slider {...settings} className="mb-4">
              {popularMovies.slice(0, 10).map((movie, index) => (
                <div key={movie.id} className="mb-1 mt-3 wheelimg">
                  <img className="rounded" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} alt={`${movie.title} slide`} />
                  <div className="translucent-background">
                    <h2 className="text-white">{movie.title}</h2>
                    <p>{movie.release_date.slice(0, 4)} &#11088;{movie.vote_average.toFixed(1)}</p>
                    <p className="text-light">{movie.overview}</p>
                    <p className="rounded-pill px-4 py-3 bg-secondary text-center" style={{ width: '11%', cursor: 'pointer' }} onClick={() => handleMovieSelect(movie)}>Watch Now</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          <div className="row align-items-center justify-content-center">
            <h3 className="text-white mt-5 mb-4 text-center"> Top of The Week</h3>
            {popularMovies.map(movie => (
              <div key={movie.id} className="border-secondary col-md-2 mb-3 mx-2 text-white thumbail" style={{ cursor: 'pointer' }} onClick={() => handleMovieSelect(movie)}>
                <img className="card-img-top rounded " src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                <div className="card-body">
                </div>
              </div>
            ))}
          </div>
        </div>}
    </>
  );
}
