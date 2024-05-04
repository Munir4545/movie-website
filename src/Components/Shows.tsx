import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Movie, Show, } from "./types";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { options } from "../apikey";


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
  autoplay: true,
  autoplaySpeed: 3000,
  waitForAnimate: false,
  variableWidth: true,
  variableHeight: true
};


export function Shows(props: ShowProps) {

  const [popularShows, setpopularShows] = useState<Show[]>([]);
  const [isSearching, SetIsSearching] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/trending/tv/week?language=en-US`, options)
      .then(response => response.json())
      .then(response => { setpopularShows(response.results); console.log(response.results) })
      .catch(err => console.error(err));

  }, []);

  const handleShowSelect = (show: Show) => {
    props.setShow(show); // Set the movie ID in the state
    props.setMovie(null);
    console.log(props.useShow);
    navigate(`/watch/${show.id}`); // Navigate to the MovieWatch component
  };




  return (
    <div className="container">
      <div className="slider-container text-white mb-3 scrollwheel rounded">
        <Slider {...settings} className="mb-4">
          {popularShows.slice(0, 10).map((show) => (
            <div key={show.id} className="mb-1 mt-3 wheelimg">
              <img className="rounded" src={`https://image.tmdb.org/t/p/original/${show.backdrop_path}`} alt={`${show.name} slide`} />
              <div className="translucent-background">
                <h2 className="text-white">{show.name}</h2>
                <p>{show.first_air_date.slice(0, 4)} &#11088;{show.vote_average.toFixed(1)}</p>
                <p className="text-light">{show.overview}</p>
                <p className="rounded-pill px-4 py-3 bg-secondary text-center" style={{ width: '11%', cursor: 'pointer' }} onClick={() => handleShowSelect(show)}>Watch Now</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="row align-items-center justify-content-center">
        <h3 className="text-white mt-5 mb-4 text-center"> Top of The Week</h3>
        {popularShows.map(show => (
          <div key={show.id} className="border-secondary col-md-2 mb-3 mx-2 text-white thumbail" style={{ cursor: 'pointer' }} onClick={() => handleShowSelect(show)}>
            <img className="card-img-top rounded" src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`} />
            <div className="card-body">

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
