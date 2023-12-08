import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import Header from './components/Header';
import MovieForm from './components/MovieForm';
import { InfoMovie } from './components/MovieForm';
import './components/css/App.css'
import Carousel from './components/Carousel';
export default function App() {
  const [movies, setMovies] = useState<InfoMovie[]>([]);
  const [editedMovie, setEditedMovie] = useState<InfoMovie | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<InfoMovie | null>(null);
  const firstRender = useRef(true)
  const moviesRef = useRef<InfoMovie[]>([]);

  useEffect(() => {
    const savedMovies = localStorage.getItem('movies');
    if (savedMovies) {
      setMovies(JSON.parse(savedMovies));
      moviesRef.current = JSON.parse(savedMovies);
    }
  }, []);

  useEffect(() => {
    if(firstRender.current) {
      firstRender.current = false
      return;
    }

    localStorage.setItem('movies', JSON.stringify(movies));
  }, [movies])

  const handleMovieClick = useCallback((movie: InfoMovie) => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }, []);

  const handleEditClick = useCallback((movie: InfoMovie) => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }, []);

  const handleRemoveClick = useCallback((movieId: number) => {
    const updateMovies = moviesRef.current.filter(movie => movie.id !== movieId);
    setMovies(updateMovies);
    moviesRef.current = updateMovies;
    setEditedMovie(null);
    setSelectedMovie(null);
  }, []);

  const handleSubmitForm = useCallback((movieForm: InfoMovie) => {
    if (editedMovie) {
      const updatedMovies = moviesRef.current.map(movie =>
        movie.id === movieForm.id ? { ...movie, ...movieForm } : movie
      );
      setMovies(updatedMovies);
      moviesRef.current = updatedMovies;
    } else {
      const newMovie = { ...movieForm, id: moviesRef.current.length + 1 }; // Gerar um novo ID
      const updatedMovies = [...moviesRef.current, newMovie];
      setMovies(updatedMovies);
      moviesRef.current = updatedMovies;
    }
    setEditedMovie(null);
    setSelectedMovie(null);
  }, [editedMovie]);

  const handleCloseMovieDetails = useCallback(() => {
    setSelectedMovie(null);
    setEditedMovie(null);
  }, []);

  const memoizedMovieList = useMemo(
    () => (
      <Carousel movies={movies}
        onEditClick={handleEditClick}
        onRemoveClick={handleRemoveClick}
        onMovieClick={handleMovieClick}
        onCloseClick={handleCloseMovieDetails}
        selectedMovie={selectedMovie}
      />
    ),
    [movies, handleEditClick, handleRemoveClick, handleMovieClick, handleCloseMovieDetails, selectedMovie]
  );

  return (
    <main className='conteudo'>
      <Header />
      {memoizedMovieList}
      <MovieForm onSubmit={handleSubmitForm} editedMovie={editedMovie} />
    </main>
  );
};