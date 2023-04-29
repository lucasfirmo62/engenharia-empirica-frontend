import React, { useState, useRef } from "react";

import QuestionCard from "../../components/QuestionCard";
import './styles.css'

import axios from 'axios';

import { Form, Radio, Button, Select, Input, Typography, Divider, Avatar } from 'antd';
import debounce from 'lodash/debounce';

import { notification } from 'antd';

import api from '../../api';

import { useNavigate } from 'react-router-dom';

const { Option } = Select;


const moods = [
    { type: "Interessado", description: "Curioso e interessado em algo." },
    { type: "Angustiado", description: "Sofrendo com ansiedade ou aflição." },
    { type: "Animado", description: "Alegre e entusiasmado com algo." },
    { type: "Chateado", description: "Triste ou irritado com algo." },
    { type: "Forte", description: "Sentindo-se confiante e capaz." },
    { type: "Culpado", description: "Sentindo-se responsável por algo negativo." },
    { type: "Assustado", description: "Com medo ou apreensivo com algo." },
    { type: "Hostil", description: "Sentindo raiva ou hostilidade." },
    { type: "Entusiasmado", description: "Muito animado com algo." },
    { type: "Orgulhoso", description: "Sentindo-se orgulhoso de si mesmo." },
    { type: "Irritado", description: "Com raiva ou aborrecido com algo." },
    { type: "Alerta", description: "Atento e alerta a alguma situação." },
    { type: "Envergonhado", description: "Sentindo vergonha ou constrangimento." },
    { type: "Inspirado", description: "Sentindo-se inspirado por algo." },
    { type: "Nervoso", description: "Ansioso ou preocupado com algo." },
    { type: "Determinado", description: "Com um forte desejo de alcançar um objetivo." },
    { type: "Atento", description: "Concentrado e atento a algo." },
    { type: "Agitado", description: "Inquieto e agitado." },
    { type: "Ativo", description: "Sentindo-se energizado e ativo." },
    { type: "Com Medo", description: "Sentindo medo ou apreensão." }
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
    const [selectKey, setSelectKey] = useState(0);
    const [showMovieSelection, setShowMovieSelection] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const debouncedSearch = useRef(
        debounce(async (value) => {
            if (value.length > 0) {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${value}&language=pt-BR`
                );
                const results = response.data.results;
                setMovies(results);
                setShowMovieSelection(results.length > 0);
            } else {
                setMovies([]);
                setShowMovieSelection(false);
            }
        }, 300)
    ).current;

    // const debouncedSearch = useRef(debounce(handleSearch, 300, { leading: true })).current;

    const handleSelectMovie = (value, option) => {
        setSelectedMovie(option.data);
    };

    const onFinish = async (values) => {
        setIsButtonDisabled(true)

        const id = localStorage.getItem('id');
        const genres = getGenres(selectedMovie.genre_ids);

        const response = await fetch(`https://api.themoviedb.org/3/movie/${selectedMovie.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        const data_movie = await response.json();
        const runtime = data_movie.runtime;

        const currentDate = new Date();
        console.log()

        const data = {
            userId: id,
            movieId: selectedMovie.id,
            movieName: selectedMovie.original_title,
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
                ashamed: values.envergonhado,
                inspired: values.inspirado,
                nervous: values.nervoso,
                determined: values.determinado,
                attentive: values.atento,
                jittery: values.agitado,
                active: values.ativo,
                afraid: values.com_medo
            }
        }

        api.post('/survey', data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                navigate('/');
                notification.success({
                    message: 'Pesquisa adicionada com sucesso',
                    duration: 2,
                });
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
            <div className="content-survey">
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    style={{
                        maxWidth: '1080px',
                        alignItems: 'center',
                        width: "100%",
                        border: "none",
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        name="selectedMovie"
                        style={{ width: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, selecione um filme!',
                            },
                        ]}
                    >
                        <Select
                            key={selectKey}
                            allowClear
                            showSearch
                            onSearch={debouncedSearch}
                            onSelect={(value, option) => {
                                const [id, title] = value.split('-');
                                setSelectedMovie({ id, title, ...option.data });
                            }}
                            value={selectedMovie?.title}
                            placeholder="Selecione um filme"
                        >
                            {movies.map((movie) => (
                                <Select.Option key={movie.id} value={`${movie.id}-${movie.title}`} data={movie}>
                                    {movie.title}
                                </Select.Option>
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

                    {moods?.map((mood) =>
                        <QuestionCard 
                            mood={mood}
                        />
                    )}

                    <Form.Item
                        style={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isButtonDisabled}
                            style={{ backgroundColor: "#398541", width: "100%", marginTop: 16 }}
                        >
                            Finalizar Pesquisa 1/2
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Survey;