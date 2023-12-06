import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { InfoMovie } from './MovieForm';
import { TbTrashXFilled } from "react-icons/tb";
import { FaPencilAlt } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { LuEyeOff } from "react-icons/lu";
import './css/Carousel.css';

interface MovieCarouselProps {
    movies: InfoMovie[];
    onEditClick: (movie: InfoMovie) => void;
    onRemoveClick: (movieId: number) => void;
    onMovieClick: (movie: InfoMovie) => void;
    onCloseClick: () => void;
    selectedMovie: InfoMovie | null;
}

export default function Carousel(props: MovieCarouselProps) {

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,  
      slidesToScroll: 1,
    };
  
    return (
      <Slider {...settings} className='carousel'>
        {props.movies.map(movie => (
            <div key={movie.id} className='card-movie'>
                <div className='img-card'>
                    <img src={movie.poster} alt={movie.title} className='imagem-card' />
                </div>
                <p className='title-card'>{movie.title}</p>
                <div className='container-icone'>
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
                    <div className='details-card'>
                    <p className='synopsis'>{props.selectedMovie.synopsis}</p>
                    <p>Elenco: {props.selectedMovie.cast}</p>
                    <p>Classificação: {props.selectedMovie.rating}</p>
                    </div>
                )}
            </div>
        ))}
      </Slider>
    );
  };