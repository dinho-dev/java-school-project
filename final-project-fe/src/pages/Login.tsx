import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const Login: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: any) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8080/api/v1/auth/authenticate", values);
            if (response.status === 200) {
                const { token } = response.data;
                const { role } = response.data;
                const { id } = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);
                localStorage.setItem('id', id);
                message.success("Logged in successfully");
                window.location.href = "/products";
            } else {
                message.error("Invalid username or password");
            }
        } catch (error) {
            message.error("Error logging in. Please try again.");
        }
        setLoading(false);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
        >
            <Form.Item
                label="Username"
                name="email"
                rules={[
                    {
                        required: true,
                        message: "Please input your email!",
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please input your password!",
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Log in
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
