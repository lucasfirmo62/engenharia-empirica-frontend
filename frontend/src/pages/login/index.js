import React from "react";
import { LockOutlined, MailOutlined } from '@ant-design/icons';
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
                style={{
                    maxWidth: 600,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: "100%",
                    border: "none"
                }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    style={{ width: '100%', textAlign: 'left' }}
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira seu email!',
                        },
                    ]}
                >
                    <Input 
                        prefix={<MailOutlined />}
                        placeholder="Email" 
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    style={{ width: '100%', textAlign: 'left' }}
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


                <Form.Item
                    style={{ width: '100%', textAlign: 'left'}}
                >
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Entrar
                    </Button>
                    <a style={{marginLeft: 12}} href="/sign-up">Registre-se</a>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Login;
