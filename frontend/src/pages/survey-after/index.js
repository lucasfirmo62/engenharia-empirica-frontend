import React, {useState} from "react";

import api from "../../api";
import QuestionCard from "../../components/QuestionCard";

import { Form, Radio, Button, Typography } from 'antd';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { notification } from 'antd';

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


const SurveyAfter = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const navigate = useNavigate();

    const survey_id = useParams()

    const onFinish = async (values) => {
        setIsButtonDisabled(true)

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
                notification.success({
                    message: 'Pesquisa finalizada com sucesso',
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
                            Finalizar Pesquisa 2/2
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default SurveyAfter;