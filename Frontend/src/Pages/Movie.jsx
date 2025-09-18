
import React, { useEffect, useState } from "react";

const Movie = () => {
  const [moviedata, setmoviedata] = useState([]);
  const [selected, setselected] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        
        const response = await fetch(`https://jsonfakery.com/movies/random`);
        const data=await response.json()

        console.log(data);

        setmoviedata([data]);
      } catch (error) {
        console.error(`something went wrong: ${error}`);
      }
    };
    fetchMovies();
  }, []);

  const handleMovies = (item) => {
    setselected(item);
  };

  return (
    <div className="moviesParent" style={{ display: "flex", gap: "20px" }}>
      {/* All movies */}
      <div className="getallmovies" style={{ flex: 1 }}>
        {moviedata.length > 0 &&
          moviedata.map((item, index) => (
            <div
              key={index}
              onClick={() => handleMovies(item)}
              style={{
                border: "1px solid gray",
                margin: "10px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              <p>ID: {item.movie_id}</p>
              <p>Name: {item.name}</p>
              <p>Original Title: {item.original_title}</p>
              <p>Overview: {item.overview}</p>
              <p>Release Date: {item.release_date}</p>
              <p>Vote Average: {item.vote_average}</p>
            </div>
          ))}
      </div>

      {/* Selected movie */}
      <div className="selectedMovie" style={{ flex: 1 }}>
        {selected && (
          <div
            style={{
              border: "2px solid blue",
              padding: "15px",
              background: "black",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <h3>Selected Movie Details</h3>
            <p>ID: {selected.movie_id}</p>
            <p>Name: {selected.name}</p>
            <p>Original Title: {selected.original_title}</p>
            <p>Overview: {selected.overview}</p>
            <p>Release Date: {selected.release_date}</p>
            <p>Vote Average: {selected.vote_average}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movie;
