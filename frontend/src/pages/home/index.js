import React, { useEffect, useState } from 'react';
import './styles.css'
import Card from '../../components/Card'

import { Button } from 'antd';
import { Modal, Typography } from 'antd';

import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';


import api from '../../api';

const Home = () => {
  const { Title, Paragraph } = Typography;

  const [survey, setSurvey] = useState([]);
  const [user, setUser] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

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
    setShowLogoutModal(true);

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

    setShowLogoutModal(false)
  };

  return (
    <div className='content'>
      <div className='header-content'>
        <div className='header-primary'>
          <p className='user'>{user.username}</p>
          <Button className="exit" style={{ marginLeft: 8, fontWeight: "bold", backgroundColor: 'red' }} onClick={() => setShowLogoutModal(true)} type="primary" htmlType="submit">
            Sair
          </Button>
        </div>
        <Button type="link" onClick={() => setShowHelpModal(true)} icon={<QuestionCircleOutlined />}>
          Ajuda
        </Button>
        <Button onClick={goTo} className="add-movie" style={{ alignItems: "center", color: "#FFF" }}>
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
      <Modal
        title="Confirmar logout"
        open={showLogoutModal}
        onOk={handleLogout}
        onCancel={() => setShowLogoutModal(false)}
      >
        <p>Deseja realmente sair?</p>
      </Modal>
      <Modal
        title="Como Funciona a Pesquisa?"
        open={showHelpModal}
        onCancel={() => setShowHelpModal(false)}
        footer={[    <Button key="close" onClick={() => setShowHelpModal(false)}> Ok </Button>  ]}
      >
        <Typography>
          <Title level={4}>Responda a Pesquisa e Assista ao Filme</Title>
          <Paragraph>
            Primeiro, você deverá responder à primeira parte da pesquisa. Depois, assista ao filme indicado na primeira parte da pesquisa.
          </Paragraph>
          <Title level={4}>Complete a Pesquisa</Title>
          <Paragraph>
            Após assistir ao filme, você deverá continuar e concluir a pesquisa.
          </Paragraph>
        </Typography>
      </Modal>
    </div>
  )
}

export default Home;