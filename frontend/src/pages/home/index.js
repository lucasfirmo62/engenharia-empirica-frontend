import React, { useEffect, useState } from 'react';
import './styles.css'
import Card from '../../components/Card'

import { Button } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import api from '../../api';

const Home = () => {

  const [survey, setSurvey] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function get_survey() {
      const id = localStorage.getItem('id');

      await api.get(`/survey/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }).then(response => { setSurvey(response.data) })
    }

    get_survey()
  }, [])

  useEffect(() => {
    async function get_user() {
      const id = localStorage.getItem('id');
      await api.get(`/user/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => { setUser(response.data) })
    }

    get_user()
  }, [])

  function goTo() {
    window.location.replace(`/survey`)
  }

  const handleLogout = () => {
    console.log(localStorage.getItem('token'))

    api.post('/logout', null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        window.location.href = '/login';
      })
      .catch((err) => {
        console.error('Error logging out:', err);
      });
  };

  return (
    <div className='content'>
      <div className='header-content'>
        <div className='header-primary'>
          <p className='user'>{user.username}</p>
          <Button className="exit" style={{ marginLeft: 8, fontWeight: "bold", backgroundColor: 'red' }} onClick={handleLogout} type="primary" htmlType="submit">
            Sair
          </Button>
        </div>
        <Button onClick={goTo} className="add-movie" style={{ alignItems: "center", color:"#FFF" }}>
          <PlusOutlined /> Adicionar Pesquisa
        </Button>
      </div>
      <div className='list'>
        <ul>
          {survey.map((survey, index) => (
            <li key={index}>
              <Card
                id={survey._id}
                movieId={survey.movieId}
                status={survey.surveyStep == "1" ? "inProgress" : "finished"}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home;