import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Select, Button, message } from "antd";
import '@ant-design/cssinjs';
import { useNavigate } from "react-router-dom";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
const CreateProductForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    interface MyFormValues {
        categoryId: number;
        title: string;
        price: number;
        parameters: string;
        weight: string;
        volume: string;
        quantityInStock: number;
        imageUrl: string;
    }
    const token = localStorage.getItem('token');
    const onFinish = async (values: MyFormValues) => {
        setLoading(true);
        try {
            await axios.post("http://localhost:8080/api/v1/products/create", values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            message.success("Product created successfully!");
            form.resetFields();
            navigate("/product");
        } catch (error) {
            console.log(error)
            message.error("Error creating product. Please try again.");
        }
        setLoading(false);
    };

    return (
        <Form layout="vertical" onFinish={onFinish} form={form}> {/* add form={form} */}
            <Form.Item
                label="Category"
                name="categoryId"
                rules={[
                    {
                        required: true,
                        message: "Please select a category",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Title"
                name="title"
                rules={[
                    {
                        required: true,
                        message: "Please enter a title",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                name="price"
                rules={[
                    {
                        required: true,
                        message: "Please enter a price",
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>
            <Form.Item
                label="Parameters"
                name="parameters"
                rules={[
                    {
                        required: true,
                        message: "Please enter parameters",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Weight"
                name="weight"
                rules={[
                    {
                        required: true,
                        message: "Please enter weight",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Volume"
                name="volume"
                rules={[
                    {
                        required: true,
                        message: "Please enter volume",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Quantity In Stock"
                name="quantityInStock"
                rules={[
                    {
                        required: true,
                        message: "Please enter quantity in stock",
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>
            <Form.Item
                label="Image URL"
                name="imageUrl"
                rules={[
                    {
                        required: true,
                        message: "Please enter an image URL",
                    },
                ]}
            >
                <Input type="url" />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateProductForm;
