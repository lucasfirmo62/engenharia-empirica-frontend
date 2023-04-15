import React from "react";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import './styles.css'

const Login = () => {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
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
                    name="Nome de Usuário"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!',
                        },
                    ]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nome de Usuário" />
                </Form.Item>
                <Form.Item
                    name="Senha"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!',
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
