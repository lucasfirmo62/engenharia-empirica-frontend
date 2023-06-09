import React, { useEffect, useState } from 'react';
import './styles.css'
import { MdOutlineTaskAlt } from 'react-icons/md';
import { RxEnter } from 'react-icons/rx';

import { AiOutlineCloseCircle } from 'react-icons/ai';
import { DeleteOutlined } from '@ant-design/icons';

import { Button, Modal } from 'antd';

import { useNavigate } from 'react-router-dom';

import api from '../../api';

const CardTitle = ({ id, movieId, status }) => {
  const navigate = useNavigate();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isButtonDeleteDisabled, setIsButtonDeleteDisabled] = useState(false);

  const handleDeleteSurvey = async () => {
    setIsButtonDeleteDisabled(true)

    async function delete_survey() {
      await api.delete(`/survey/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => { 
        console.log("pesquisa deletada") 
        window.location.reload()
      })
    }

    delete_survey()

    setShowConfirmModal(false)
  };

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=pt-BR`)
      .then(response => response.json())
      .then(json => json)
      .then(async (data) => {
        setMovie(await data);
      })
  }, [id])


  function goTo() {
    navigate(`/finalsurvey/${id}`)
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsSmallScreen(mediaQuery.matches);
    const handleResize = () => setIsSmallScreen(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleResize);
    return () => {
      mediaQuery.removeEventListener('change', handleResize);
    }
  }, [])

  return (
    <div className='card-title'>
      <center>
        <img className='poster-img' alt="Pesquisa" src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} />
      </center>
      <p className='title-movie'>{movie.title}</p>
      <div className='card-right-block'>
        <Button
          className='button-delete'
          style={{ fontWeight: "bold", color: "#FFF", marginBotton: '16px', backgroundColor: 'red' }}
          type="danger"
          onClick={() => setShowConfirmModal(true)}
          onTouchStart={() => setShowConfirmModal(true)}
          disabled={isButtonDeleteDisabled}
          icon={<DeleteOutlined />}
        >
          {isSmallScreen ? <span style={{paddingLeft: 4}}>Apagar Pesquisa</span> : true}
        </Button>
        <Modal
          title="Confirmação de exclusão"
          open={showConfirmModal}
          onOk={handleDeleteSurvey}
          onCancel={() => setShowConfirmModal(false)}
        >
          <p>Tem certeza de que deseja excluir esta pesquisa?</p>
        </Modal>
        {(status === "finished") ?
          <div className='status-finished'>
            <MdOutlineTaskAlt className='icon' /><p>Pesquisa Finalizada 2/2</p>
          </div>
          :
          <div className='status-inProgress' onClick={goTo} onTouchStart={goTo}>
            <RxEnter className='icon' /><p>Continuar Pesquisa 1/2</p>
          </div>

        }
      </div>
    </div>
  )
}

export default CardTitle;