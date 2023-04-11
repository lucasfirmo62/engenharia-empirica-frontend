import React, { useState } from "react";

import axios from 'axios';

import { Form, Radio, Button, Select, Input, Typography } from 'antd';

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

const Survey = () => {
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

    const onFinish = (values) => {
        console.log('Success:', values);
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
                    >
                        <Input.Search onSearch={handleSearch} enterButton />
                    </Form.Item>

                    <Form.Item
                        label="Filme selecionado"
                        name="selectedMovie"
                        style={{ width: '100%' }}
                        hidden={!showMovieSelection}
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
                                style={{ borderRadius: 8, marginRight: 16, width: 40, marginRight: 16 }}
                            />
                            <h3 style={{ color: "white" }}>{selectedMovie.title}</h3>
                        </div>
                    )}

                    <Typography.Title level={2}>
                        Análise do Humor com PANAS
                    </Typography.Title>

                    {moods?.map((mood) =>
                        <Form.Item label={mood}>
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