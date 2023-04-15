import React from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './styles.css'

import { useNavigate } from 'react-router-dom';

import { Navigate } from "react-router-dom";

import api from '../../api';

const Login = () => {

    const navigate = useNavigate();

    const isLoggedIn = localStorage.getItem('token');

    if (isLoggedIn) {
        return <Navigate to="/" />;
    }

    const onFinish = (values) => {
        api.post('/login', values)
            .then(response => {
                localStorage.setItem('id', response.data.id);
                localStorage.setItem('token', response.data.token);
                navigate('/');
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="content-login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira seu email!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nome de Usuário" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira sua senha!',
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Senha"
                    />
                </Form.Item>


                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Entrar
                    </Button>
                    ou <a href="/sign-up">Registre-se</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;
