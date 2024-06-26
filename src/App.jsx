import { useState, useEffect } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=379d6800";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);


  const SearchMovie = async (title) => {
    const res = await fetch(`${API_URL}&s=${title}`);
    const data = await res.json();
    setIsLoading(false);
    setMovies(data.Search);
    console.log(data);
  };

  useEffect(() => {
    SearchMovie("batman");
  }, []);

  return (

    <div className='app'>
      <h1>MovieLand</h1>

      <div className='search'>
        <input
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <img
          src={SearchIcon}
          alt='icon search'
          onClick={() => SearchMovie(searchTerm)}
        />
      </div>

      {isLoading ? (
        <div className='loading'>Loading...</div>
      ) : movies?.length > 0 ? (
        <div className='container'>
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <div className='empty'>
          <h2>NO movies found</h2>
        </div>
      )}
    </div>
  );
}

export default App;
