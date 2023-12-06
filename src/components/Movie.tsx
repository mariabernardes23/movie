import { InfoMovie } from './MovieForm';

interface MovieProps {
  movie: InfoMovie;
  onClose: () => void;
}

export default function Movie (props: MovieProps) {
  return (
    <div>
      <h2>{props.movie.title}</h2>
      <p>{props.movie.poster}</p>
      <p>{props.movie.rating}</p>
      <p>{props.movie.synopsis}</p>
      <p>{props.movie.cast}</p>
      <button onClick={props.onClose}>Fechar</button>
    </div>
  );
};
