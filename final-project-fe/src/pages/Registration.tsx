import { Form, Input, Button, message, Select, DatePicker } from 'antd';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import '@ant-design/cssinjs';
import axios from "axios";

const RegistrationForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate(); // add useNavigate hook
    const [loading, setLoading] = useState(false);

    interface RegFormValues {
        firstname: string;
        lastname: string;
        dateOfBirth: Date;
        email: string;
        password: string;
    }


    const onFinish = async (values: RegFormValues) => { // update type of values to MyFormValues
        setLoading(true);
        try {
            await axios.post("http://localhost:8080/api/v1/auth/register", values);
            message.success("Your account successfully  created!"); // update success message
            form.resetFields(); // reset form fields
            navigate("/products"); // navigate to product page
        } catch (error) {
            message.error("Error creating a new account. Please try again.");
        }
        setLoading(false);
    };

    return (
        <Form
            name="register"
            onFinish={onFinish}
            scrollToFirstError
        >
            <Form.Item
                name="firstname"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="lastname"
                label="Last name"
                rules={[
                    {
                        required: true,
                        message: 'Please input your last name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[{ required: true, message: 'Please select your date of birth' }]}
            >
                <DatePicker />
            </Form.Item>

            <Form.Item
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegistrationForm;
