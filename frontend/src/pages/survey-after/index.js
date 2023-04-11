import React from "react";


import { Form, Radio, Button, Typography } from 'antd';

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

// passar o id do Survey por props
const SurveyAfter = (props) => {
    const onFinish = async (values) => {
        
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
                            Finalizar Pesquisa 2/2
                        </Button>
                    </Form.Item>
                </Form>
            </center>
        </>
    )
}

export default SurveyAfter;