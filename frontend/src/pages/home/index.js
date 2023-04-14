import React, { useEffect, useState } from 'react';
import './styles.css'
import Card from '../../components/Card'
import { AiOutlinePlus } from 'react-icons/ai';


const Home = () => {

  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetch(`https://api.npoint.io/abb1d797d98f26a45a6c`)
      .then(response => response.json())
      .then(json => json.movies)
      .then(async (data) => {
        setMovies(await data);
      })
  }, [])

  useEffect(() => {
    fetch(`https://api.npoint.io/abb1d797d98f26a45a6c`)
      .then(response => response.json())
      .then(json => json)
      .then(async (data) => {
        setUser(await data);
      })
  }, [])

  function goTo(){
    window.location.replace(`/survey`)
  }

  return (
    <div className='content'>
      <div className='header-content' onClick={goTo}>
        <p className='user'>{user.name_user}</p>
        <div className='add-movie'><AiOutlinePlus className='icon-add'/><p>Adicionar Filme</p></div>
      </div>
      <div className='list'>
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>
              <Card
                id={movie.id}
                status={movie.status}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home;