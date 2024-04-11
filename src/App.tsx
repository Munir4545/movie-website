import React, { useState } from 'react';
import './App.css';
import {Header} from "./Components/Header";
import {MovieWatch} from './Components/MovieWatch';
import { Search } from './Components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Components/Home';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Movie, Show } from './Components/types';
import { Shows } from './Components/Shows';



function App() {
  const [inputValue, setInputValue] = useState(""); // State to capture user input
  const [useMovie, setMovie] = useState<Movie | null>(null);// State to hold the movie ID for the iframe
  const [useShow, setShow] = useState<Show | null>(null);

  const handleSetMovie = (movie: Movie | null) => {
    setMovie(movie);
  };

  const handleSetShow = (show: Show | null) => {
    setShow(show);
  }



  return (
    
    <BrowserRouter>
      <>
      
      
        <Header/>
        <div className='content-wrapper'>
        <Routes>
          <Route path='/search' element={<Search inputValue={inputValue} setShow={handleSetShow} setInputValue={setInputValue} useMovie={useMovie} setMovie={handleSetMovie} />} />
          <Route path='/movies' element={<Home useMovie={useMovie} setShow={handleSetShow} setMovie={handleSetMovie} />} />
          <Route path='/shows' element={<Shows useShow={useShow} setShow={handleSetShow} setMovie={handleSetMovie}/>} />
          <Route path='/watch/:movieId' element={<MovieWatch useShow={useShow} useMovie={useMovie} setMovie={handleSetMovie}/>} />
          <Route path="*" element={<Navigate to="/movies" />} />
        </Routes>
        <footer className="bg-dark text-white py-3">
          <div className="container">
            <p>&copy; 2024 Movie Index</p>
            <p>Movie Index is a search engine. We do not host any files nor does Movie Index serve them. Legal Issues should be taken with file hosts and providers.</p>
          </div>
        </footer>
        </div>
      </>
    </BrowserRouter>
   
  );
}

export default App;
