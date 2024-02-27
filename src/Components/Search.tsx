import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pagination } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { Movie, ApiResponse } from "./types";
import { options } from "../apikey";

type MovieSearch = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  setMovie: (movie: Movie | null) => void;
  useMovie: Movie | null;
};

export function Search(props: MovieSearch) {
  const { inputValue, setInputValue } = props;
  const [searchedMovies, setSearchedMovies] = useState<ApiResponse>({ page: 1, results: [], total_pages: 0, total_results: 0 });
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const location = useLocation(); // Use the useLocation hook
  let totalPages = 0;

  useEffect(() => {
    const queryParam = new URLSearchParams(location.search).get("query");
    if (queryParam) {
      setInputValue(queryParam);
      // Fetch data based on the new query here if needed

      fetch(`https://api.themoviedb.org/3/search/multi?query=${queryParam}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then((data: ApiResponse) => {
          const filteredResults = data.results.filter(item => item.media_type !== "person");
          setSearchedMovies({
            ...data,
            results: filteredResults,
          });
          totalPages = data.total_pages;
        })
        .catch(err => console.error(err));
    }
  }, [location.search, setInputValue]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // Update inputValue with every change
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Fetch data based on the new query
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNTM3ZWM1ZjRiMmM4ODA4NWU3YzhkYTg2ZDUzMjdlNiIsInN1YiI6IjY1ZDE4ZWMxYWE2NTllMDE4NjQzMjk5NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5SjVl-XKJnnLoJ3z-_Fd-ZDFOTRiUUbLhM8gHTqrgnE'
        }
      };

      fetch(`https://api.themoviedb.org/3/search/multi?query=${inputValue}&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then((data: ApiResponse) => {
          const filteredResults = data.results.filter(item => item.media_type !== "person");
          
          setSearchedMovies({
            ...data,
            results: filteredResults,
          });
          totalPages = data.total_pages;
        })
        .catch(err => console.error(err));

      // Update the URL with the search query
      navigate(`/search?query=${inputValue}`);
    }
  };



  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleMovieSelect = (movie: Movie) => {
    props.setMovie(movie); // Set the movie ID in the state
    console.log(props.useMovie);
    navigate(`/watch/${movie.id}`); // Navigate to the MovieWatch component
};

  return (
    <>
    <div className="col-xs-4">
      <input
        type="text"
        className="form-control bg-dark border-secondary text-white rounded-pill custom-placeholder"
        placeholder="Search for Movie"
        aria-label="Search"
        value={inputValue} // Use inputValue for the input element
        onChange={handleInputChange} // Update inputValue on change
        onKeyPress={handleKeyPress} // Only update useMovie when Enter is pressed
      />
      </div>
      <div className="container mt-3" >
     <div className="row align-items-center justify-content-center">
    {searchedMovies.results.map(movie => (
        <div key={movie.id} className="border-secondary col-md-2 mb-3 mx-2 text-white" style={{cursor: 'pointer'}} onClick={() => handleMovieSelect(movie)}>
        <img className="card-img-top rounded " src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
            <div className="card-body">
          
          {/* Render other movie details as needed */}
          </div>
        </div>
      ))}
      </div> 
      <div className="justify-content-center d-flex">
      <Pagination className="bg-dark">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={searchedMovies.page === 1} />
        <Pagination.Prev onClick={() => handlePageChange(searchedMovies.page - 1)} disabled={searchedMovies.page === 1} />
        {/* You can add Pagination.Item here for specific page numbers */}
        <Pagination.Next onClick={() => handlePageChange(searchedMovies.page + 1)} disabled={searchedMovies.page === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
      </div>
    </div>
     
      </>
  )
}