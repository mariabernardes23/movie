import { useState, useEffect, FormEvent, useRef } from 'react';
import './css/movieForm.css'
// Importações para os tipos/interfaces usados no componente
export interface InfoMovie {
  id: number;
  title: string;
  poster: string;
  synopsis: string;
  cast: string;
  rating: string;
}

interface MovieFormProps {
  onSubmit: (movieForm: InfoMovie) => void;
  editedMovie: InfoMovie | null;
}

// Definição do componente MovieForm
export default function MovieForm (props: MovieFormProps) {
  // Estado local para armazenar os dados do filme no formulário
  const [id, setId] = useState(0);
  const [inputTitle, setInputTitle] = useState('');
  const [inputPoster, setInputPoster] = useState('');
  const [inputSynopsis, setInputSynopsis] = useState('');
  const [inputCast, setInputCast] = useState('');
  const [inputRating, setInputRating] = useState('');
  const [movie, setMovie] = useState<InfoMovie>({
    id: 0,
    title: '',
    poster: '',
    synopsis: '',
    cast: '',
    rating: '',
  });
  const inputRef = useRef<HTMLInputElement>(null);

  // Efeito para preencher o formulário com os dados do filme a ser editado
  useEffect(() => {
    if (props.editedMovie) {
      // Se há um filme para edição, preenche o formulário com os dados do filme
      inputRef.current?.focus();
      setId(props.editedMovie.id);
      setInputTitle(props.editedMovie.title);
      setInputPoster(props.editedMovie.poster);
      setInputSynopsis(props.editedMovie.synopsis);
      setInputCast(props.editedMovie.cast);
      setInputRating(props.editedMovie.rating);
    }
  }, [props.editedMovie]);

  useEffect(() => {
    if(movie.title.trim() !== '' && movie.poster.trim() !== '' && movie.synopsis.trim() !== '' && movie.cast.trim() !== '') {
        console.log(movie);
        props.onSubmit(movie); // Enviar os dados do filme para o componente pai
        clearInput()
    } else {
        clearInput();
        return;
    }
}, [movie]);

  const clearInput = () => {
      setInputTitle('');
      setInputPoster('');
      setInputSynopsis('');
      setInputCast('');
      setInputRating('');
  }

  const handleSubmit = (event : FormEvent) => {
      event.preventDefault(); // Prevenir o comportamento padrão de submissão do formulário
      console.log(inputTitle, inputPoster, inputSynopsis, inputCast, inputRating);
      setMovie({
          id: id,
          title: inputTitle,
          poster: inputPoster,
          synopsis: inputSynopsis,
          cast: inputCast,
          rating: inputRating,
      })
  };

  // Renderização do formulário
  return (
    <form 
      onSubmit={handleSubmit}
      className="form"
    >
      <input
        placeholder="Digite o título do filme"
        type="text"
        name="title"
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)} 
        ref={inputRef}
      />

      <input
        placeholder="Caminho da imagem do poster"
        type="text"
        name="poster"
        value={inputPoster}
        onChange={(e) => setInputPoster(e.target.value)}
      />
      
      <textarea
        placeholder="Digite a sinopse do filme"
        name="synopsis"
        value={inputSynopsis}
        onChange={(e) => setInputSynopsis(e.target.value)}
      />

      <select 
        name="rating"
        value={inputRating}
        onChange={(e) => setInputRating(e.target.value)}
      >
        <option value="Infantil">Infantil</option>
        <option value="Livre">Livre</option>
        <option value="10 anos">10 anos</option>
        <option value="12 anos">12 anos</option>
        <option value="14 anos">14 anos</option>
        <option value="16 anos">16 anos</option>
        <option value="18 anos">18 anos</option>
      </select>

      <input
        placeholder="Digite o elenco do filme"
        type="text"
        name="cast"
        value={inputCast}
        onChange={(e) => setInputCast(e.target.value)}
      />
      <button type="submit" className="button">{props.editedMovie ? 'Atualizar' : 'Adicionar'}</button>
      {/* O texto do botão muda entre Adicionar e Atualizar dependendo se estamos editando ou adicionando */}
    </form>
  );
};