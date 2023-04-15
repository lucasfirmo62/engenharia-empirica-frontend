import React from "react";

import { useNavigate } from 'react-router-dom';

import { Button, Form, Select, DatePicker, Input } from 'antd';

import api from '../../api';

const { Option } = Select;

const SignUp = () => {
    const navigate = useNavigate();

    const onGenderChange = (value) => {
        switch (value) {
            case 'masculino':
                break;
            case 'feminino':
                break;
            case 'prefiro não informar':
                break;
            case 'outro':
                break;
            default:
                break;
        }
    };

    const onFinish = (values) => {
        api.post('/signup', values)
            .then(response => {
                navigate('/login');
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
                        borderRadius: 32,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: "#FFFFFF",
                        padding: 64,
                        margin: 32,
                        width: "100%",
                        border: "none"
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Nome de Usuário"
                        name="username"
                        style={{ width: '100%', textAlign: 'left' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        style={{ width: '100%', textAlign: 'left' }}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, escreva seu email!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Genêro"
                        style={{ width: '100%', textAlign: 'left' }}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            placeholder="Selecione uma opção de genêro"
                            onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="male">masculino</Option>
                            <Option value="female">feminino</Option>
                            <Option value="prefiro não informar">prefiro não informar</Option>
                            <Option value="other">outro</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        noStyle
                        style={{ width: '100%', textAlign: 'left' }}
                        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('gender') === 'other' ? (
                                <Form.Item
                                    name="gênero"
                                    style={{ width: '100%', textAlign: 'left' }}
                                    label="Identifique seu gênero"
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>

                    <Form.Item
                        label="Senha"
                        name="password"
                        style={{ width: '100%', textAlign: 'left' }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmar"
                        label="Confirmar Senha"
                        dependencies={['password']}
                        style={{ width: '100%', textAlign: 'left' }}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, confirme sua senha!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('As duas senhas que você passou não conferem!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        style={{ width: '100%', textAlign: 'left' }}
                        name="birthDate"
                        label="Data de Nascimento"
                    >
                        <DatePicker />
                    </Form.Item>

                    <Form.Item
                        style={{ width: '100%' }}
                    >
                        <Button
                            type="primary" htmlType="submit"
                        >
                            Cadastrar-se
                        </Button>
                    </Form.Item>
                </Form>
            </center>
        </>
    )
}

export default SignUp;