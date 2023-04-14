import React, { useEffect, useState } from 'react';
import './styles.css'
import { MdOutlineTaskAlt } from 'react-icons/md';
import { RxEnter } from 'react-icons/rx';

const CardTitle = ({id, status}) => {

    const [movie, setMovie] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=pt-BR`)
          .then(response => response.json())
          .then(json => json)
          .then(async (data) => {
            setMovie(await data);
          })
      }, [id])


      function goTo(){
        window.location.replace(`/finalsurvey/${id}`)
      }


    return (
        <div className='card-title'>
            <center>
            <img className='poster-img' alt="Pesquisa" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`}/>
            </center>
            <p className='title-movie'>{movie.title}</p>
            {(status === "finished") ? 
            <div className='status-finished'>
              <MdOutlineTaskAlt className='icon'/><p>Pesquisa Finalizada 2/2</p>
            </div>
            :
            <div className='status-inProgress' onClick={goTo}>
              <RxEnter className='icon'/><p>Continuar Pesquisa 1/2</p>
            </div>

          }
        </div>
    )
}

export default CardTitle;