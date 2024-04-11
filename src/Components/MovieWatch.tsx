
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { Reviews } from "./Reviews";
import { Movie, Show, ShowEp } from "./types";
import { options } from "../apikey";


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
  const [isSearching, SetIsSearching] = useState(true);
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
          setContentSrc(`https://vidsrc.me/embed/tv?tmdb=${movieId}&season=${selectedSeason}&episode=${selectedEp}`);
        } else {
          throw new Error('No seasons data');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setContentSrc(`https://vidsrc.me/embed/movie?tmdb=${movieId}`);
      });
  }, [movieId, selectedSeason, selectedEp]);


  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(parseInt(e.target.value));
    setSelectedEp(1);
  };

  const handleEpisodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEp(parseInt(e.target.value));
  };


  console.log("show name", useShow?.name)
  return (
    <>
      
      <div className="responsive ">
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
      <div className="box mt-4">
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
      </div>
      <div className=" bg-myColor text-white rounded p-3 m-3 descriptionContainer">
        <img className="rounded" src={`https://image.tmdb.org/t/p/w500/${useMovie?.poster_path || useShow?.poster_path}`}/>
        <div className="detail">
        <h1 className="align-items-center justify-content-center">{useMovie?.title || useShow?.name}</h1>
        <h2>{useMovie?.release_date || useShow?.first_air_date}</h2>
        <p className="text-secondary"> {useMovie?.overview || useShow?.overview}</p>
        <p> Rating: {useMovie?.vote_average || useShow?.vote_average}&#11088; out of {useMovie?.vote_count || useShow?.vote_count}</p>
        </div>
      </div>
      <Reviews movieId={movieId}></Reviews>
    </>
  );
}
