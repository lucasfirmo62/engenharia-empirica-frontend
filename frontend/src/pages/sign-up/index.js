import React from "react";

import { useNavigate } from 'react-router-dom';

import { Button, Form, Select, DatePicker, Input } from 'antd';

import { MailOutlined, UserOutlined, LockOutlined, CalendarOutlined, genderless } from '@ant-design/icons';

import { Link } from "react-router-dom";

import api from '../../api';

import { Navigate } from "react-router-dom";

const { Option } = Select;

const SignUp = () => {
    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

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
            <div className="content-login">
                <Form
                    name="basic"
    
                    style={{
                        maxWidth: 600,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                        name="username"
                        style={{ width: '100%', textAlign: 'left' }}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, coloque seu username!',
                            },
                        ]}
                    >
                        <Input 
                            placeholder="Nome de Usuário"
                            prefix={<UserOutlined />}
                            type="text"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        style={{ width: '100%', textAlign: 'left' }}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, escreva seu email!',
                            },
                        ]}
                    >
                        <Input 
                            placeholder="Email"
                            prefix={<MailOutlined />}
                            type="email"
                        />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        style={{ width: '100%', textAlign: 'left' }}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, coloque seu gênero!',
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
                                    rules={[
                                        {
                                            required: false,
                                        },
                                    ]}
                                >
                                    <Input 
                                        placeholder="Digite seu gênero"
                                    />
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>

                    <Form.Item
                        name="password"
                        style={{ width: '100%', textAlign: 'left' }}
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, coloque sua senha!',
                            },
                        ]}
                    >
                        <Input.Password 
                            placeholder="Senha"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirmar"
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
                        <Input.Password 
                            placeholder="Senha"
                            prefix={<LockOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        style={{ width: '100%' }}
                        name="birthDate"
                        rules={[
                            {
                                required: true,
                                message: 'Por favor, coloque sua data de nascimento!',
                            },
                        ]}
                    >
                        <DatePicker 
                            style={{ width: '100%' }}
                            placeholder="Data de Nascimento"
                            prefix={<CalendarOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        style={{ width: '100%', textAlign: 'left'}}
                    >
                        <Button type="primary" htmlType="submit" className="login-form-button">
                        Cadastrar-se
                        </Button>
                        ou <a href="/login">Entrar aqui</a>
                    </Form.Item>

                </Form>
            </div>
        </>
    )
}

export default SignUp;