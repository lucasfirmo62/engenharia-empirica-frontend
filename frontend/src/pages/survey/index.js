import React, { useState } from "react";

import axios from 'axios';

import { Form, Radio, Button, Select, Input, Typography } from 'antd';

import api from '../../api';

import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const moods = [
    "Interessado",
    "Angustiado",
    "Animado",
    "Chateado",
    "Fortalecido",
    "Culpado",
    "Assustado",
    "Hostil",
    "Entusiasmado",
    "Orgulhoso",
    "Irritável",
    "Alerta",
    "Envergonhado",
    "Inspirado",
    "Nervoso",
    "Determinado",
    "Atento",
    "Agitado",
    "Ativo",
    "Com Medo"
];

function getGenres(genreIds) {
    const genreMap = {
        28: 'Ação',
        12: 'Aventura',
        16: 'Animação',
        35: 'Comédia',
        80: 'Crime',
        99: 'Documentário',
        18: 'Drama',
        10751: 'Família',
        14: 'Fantasia',
        36: 'História',
        27: 'Terror',
        10402: 'Música',
        9648: 'Mistério',
        10749: 'Romance',
        878: 'Ficção Científica',
        10770: 'Cinema TV',
        53: 'Thriller',
        10752: 'Guerra',
        37: 'Faroeste'
    }

    return genreIds.map(id => genreMap[id]);
}

const Survey = () => {
    const navigate = useNavigate();

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [showMovieSelection, setShowMovieSelection] = useState(false);

    const handleSearch = async (value) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${value}`
        );
        const results = response.data.results;
        if (results.length > 0) {
            setMovies(results);

            setShowMovieSelection(true);
        } else {
            setMovies(null);

            setShowMovieSelection(false);
        }
    };

    const handleSelectMovie = (value, option) => {
        setSelectedMovie(option.data);
    };

    const onFinish = async (values) => {
        const genres = getGenres(selectedMovie.genre_ids);
        
        const response = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        const data_movie = await response.json();
        const runtime = data_movie.runtime;

        const currentDate = new Date();

        const data = {
            userId: "6435e5d94d8b8662ce2b8157",
            surveyDate: currentDate,
            popularity: selectedMovie.popularity,
            movieGenre: genres,
            movieRating: selectedMovie.vote_average,
            runtime: runtime,
            positiveAffectBefore: {
                interested: values.interessado,
                distressed: values.angustiado,
                excited: values.animado,
                upset: values.chateado,
                strong: values.forte,
                guilty: values.culpado,
                scared: values.assustado,
                hostile: values.hostil,
                enthusiastic: values.entusiasmado,
                proud: values.orgulhoso,            
            },
            negativeAffectBefore: {
                irritable: values.irritado,
                alert: values.alerta,
                ashamed:  values.envergonhado,
                inspired:  values.inspirado,
                nervous: values.nervoso,
                determined: values.determinado,
                attentive: values.atento,
                jittery: values.agitado,
                active: values.ativo,
                afraid: values.com_medo
            }
        }

        api.post('/survey', data)
            .then(response => {
                navigate('/home');
            })
            .catch(error => {
                console.log(error);
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <center>
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    style={{
                        maxWidth: 600,
                        backgroundColor: "#FFFFFF",
                        padding: 16,
                        margin: 8,
                        width: "100%"
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Pesquisar filme"
                        name="movie"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, selecione um filme!',
                            },
                        ]}
                    >
                        <Input.Search onSearch={handleSearch} enterButton />
                    </Form.Item>

                    <Form.Item
                        label="Filme selecionado"
                        name="selectedMovie"
                        style={{ width: '100%' }}
                        hidden={!showMovieSelection}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, selecione um filme!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            onSelect={handleSelectMovie}
                            placeholder="Selecione um filme"
                        >
                            {movies.map((movie) => (
                                <Option key={movie.id} value={movie.title} data={movie}>
                                    {movie.title}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {selectedMovie && (
                        <div style={{ borderRadius: 8, display: 'flex', alignItems: 'center', backgroundColor: "green", padding: 8 }}>
                            <img
                                src={`https://image.tmdb.org/t/p/w300${selectedMovie.poster_path}`}
                                alt={selectedMovie.title}
                                style={{ borderRadius: 8, width: 40, marginRight: 16 }}
                            />
                            <h3 style={{ color: "white" }}>{selectedMovie.title}</h3>
                        </div>
                    )}

                    <Typography.Title level={2}>
                        Análise do Humor com PANAS
                    </Typography.Title>

                    {moods?.map((mood) =>
                        <Form.Item
                            label={mood}
                            name={mood === 'Com Medo' ? 'com_medo' : mood}
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor, selecione um valor!',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="1">1</Radio>
                                <Radio value="2">2</Radio>
                                <Radio value="3">3</Radio>
                                <Radio value="4">4</Radio>
                                <Radio value="5">5</Radio>
                            </Radio.Group>
                        </Form.Item>
                    )}

                    <Form.Item
                        style={{ width: '100%' }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ backgroundColor: "#398541" }}
                        >
                            Finalizar Pesquisa 1/2
                        </Button>
                    </Form.Item>
                </Form>
            </center>
        </>
    )
}

export default Survey;