
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Reviews } from "./Reviews";
import { Movie, Show, ShowEp } from "./types";
import { options } from "../apikeys";

type MovieProps = {
  useMovie: Movie | null;
  setMovie: (movie: Movie | null) => void;
  useShow: Show | null;
};

export function MovieWatch(props: MovieProps) {
  const { useMovie, useShow } = props;
  const [contentSrc, setContentSrc] = useState('');
  const [seasonEp, setSeasonEp] = useState<ShowEp[]>([]);
  const [selectedEp, setSelectedEp] = useState<number>(1);
  const [selectedSeason, setSelectedSeason] = useState<number>(1);
  let { movieId } = useParams();

  useEffect(() => {
  
    console.log('Fetching data for:', movieId, selectedSeason, selectedEp);
  
    fetch(`https://api.themoviedb.org/3/tv/${movieId}?language=en-US`, options)
    .then(response => {
      if (!response.ok) {
        throw new Error('Not found');
      }
      return response.json();
    })
    .then(response => {
      console.log('Fetch successful:', response);
      if (response.seasons && response.seasons.length > 0) {
        setSeasonEp(response.seasons);
        setContentSrc(`https://moviesapi.club/tv/${movieId}-${selectedSeason}-${selectedEp}`);
      } else {
        throw new Error('No seasons data');
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
      setContentSrc(`https://moviesapi.club/movie/${movieId}`);
    });
  }, [movieId, selectedSeason, selectedEp]);
  

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(parseInt(e.target.value));
    setSelectedEp(1);
  };

  const handleEpisodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEp(parseInt(e.target.value));
  };
  
  return (
    <>
      <div className="card bg-myColor text-white rounded p-3 m-3 border-secondary">
        <h1 className="align-items-center justify-content-center">{useMovie?.title || useShow?.name}</h1>
        <h2>{useMovie?.release_date || useShow?.first_air_date}</h2>
        <p className="">Description: {useMovie?.overview || useShow?.overview}</p>
        <p> Rating &#11088;: {useMovie?.vote_average || useShow?.vote_average} out of {useMovie?.vote_count || useShow?.vote_count}</p>
      </div>
      <div className="responsive">
        <iframe
          key={useMovie?.id || useShow?.id} // Use key to force re-render
          src={contentSrc}
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      {/* Additional logic to display all available episodes can be added here */}

      {seasonEp && seasonEp.length > 0 && (
        <select value={selectedSeason} onChange={handleSeasonChange}>
          {seasonEp.map((season) => (
            <option key={season.id} value={season.season_number}>
              Season {season.season_number}
            </option>
          ))}
        </select>
      )}
      {seasonEp && seasonEp.length > 0 && selectedSeason && (
        <select value={selectedEp} onChange={handleEpisodeChange}>
          {Array.from({ length: seasonEp.find(season => season.season_number === selectedSeason)?.episode_count || 0 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              Episode {index + 1}
            </option>
          ))}
        </select>
      )}
      <Reviews movieId={movieId}></Reviews>
    </>
  );
}
