import { InfoMovie } from './MovieForm';
import './css/movieList.css';
import { TbTrashXFilled } from "react-icons/tb";
import { FaPencilAlt } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { LuEyeOff } from "react-icons/lu";

interface MovieListProps {
  movies: InfoMovie[];
  onEditClick: (movie: InfoMovie) => void;
  onRemoveClick: (movieId: number) => void;
  onMovieClick: (movie: InfoMovie) => void;
  onCloseClick: () => void;
  selectedMovie: InfoMovie | null;
}

export default function MovieList (props: MovieListProps) {
  return (
    <div className='cardList'>
      {props.movies.map(movie => (
        <div key={movie.id} className='card'>
          <div className='imgCard'>
            <img src={movie.poster} alt={movie.title} className='imagemCard' />
          </div>
          <p className='titleCard'>{movie.title}</p>
          <div className='containerIcone'>
            {props.selectedMovie && props.selectedMovie.id === movie.id ? (
              <LuEyeOff
                onClick={() => props.onCloseClick()}
                className='icone'
              />
            ) : (
              <FiEye
                className='icone'
                onClick={() => props.onMovieClick(movie)}
              />
            )}
            <FaPencilAlt 
              className='icone'
              onClick={() => props.onEditClick(movie)}
            />
            <TbTrashXFilled 
              className='icone'
              onClick={() => props.onRemoveClick(movie.id)}
            />
          </div>
          {props.selectedMovie && props.selectedMovie.id === movie.id && (
            <div className='detailsCard'>
              <p className='synopsis'>{props.selectedMovie.synopsis}</p>
              <p>Elenco: {props.selectedMovie.cast}</p>
              <p>Classificação: {props.selectedMovie.rating}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
