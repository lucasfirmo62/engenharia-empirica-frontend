import React from "react";

import api from "../../api";

import { Form, Radio, Button, Typography } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

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

const SurveyAfter = () => {
    const navigate = useNavigate();

    const survey_id = useParams()

    const onFinish = async (values) => {      
        const data = {
            positiveAffectAfter: {
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
            negativeAffectAfter: {
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
            },
            surveyStep: "2"
        }

        api.patch(`/survey/${survey_id.id}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then(response => {
                navigate('/');
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
                    <Typography.Title level={2}>
                        Análise do Humor com PANAS
                    </Typography.Title>

                    {moods?.map((mood) =>
                        <Form.Item
                            label={mood}
                            name={mood === 'Com Medo' ? 'com_medo' : mood.toLowerCase()}
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
                            Finalizar Pesquisa 2/2
                        </Button>
                    </Form.Item>
                </Form>
            </center>
        </>
    )
}

export default SurveyAfter;