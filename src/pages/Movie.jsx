import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";

function Movie() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/movies/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Movie not found");
        }
        return response.json();
      })
      .then(data => setMovie(data))
      .catch(error => {
        console.error("Error fetching movie:", error);
        setMovie(null);
      });
  }, [id]);

  if (!movie) return <div>Loading movie details...</div>;

  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>{movie.title}</h1>
        <p>Time: {movie.time} minutes</p>
        <div className="genres">
          {movie.genres.map((genre, index) => (
            <span key={index}>{genre}</span>
          ))}
        </div>
      </main>
    </>
  );
}

export default Movie;