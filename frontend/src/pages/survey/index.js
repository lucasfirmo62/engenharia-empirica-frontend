import React from "react";

import { Form, Radio, Button } from 'antd';

const moods = [
    "Interessado",
    "Angustiado",
    "Animado",
    "Chateado",
    "Strong",
    "Guilty",
    "Scared",
    "Hostile",
    "Enthusiastic",
    "Proud",
    "Irritable",
    "Alert",
    "Ashamed",
    "Inspired",
    "Nervous",
    "Determined",
    "Attentive",
    "Jittery",
    "Active",
    "Afraid",
]

const Survey = () => {

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
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    {/* Criar campo para selecionar o filme */}

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
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Finalizar Pesquisa
                        </Button>
                    </Form.Item>
                </Form>
            </center>
        </>
    )
}

export default Survey;