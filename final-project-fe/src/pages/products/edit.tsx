import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Select, Button, message } from 'antd';
import '@ant-design/cssinjs';
import { useNavigate, useParams } from "react-router-dom";

const EditProductForm = () => {
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState<MyFormValues>();

    interface MyFormValues {
        id: string;
        categoryId: number;
        title: string;
        price: number;
        parameters: string;
        weight: string;
        volume: string;
        quantityInStock: number;
        imageUrl: string;
    }

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/products/${id}`);
                setProduct(response.data);
                form.setFieldsValue(response.data);
            } catch (error) {
                message.error('Error fetching product. Please try again.');
            }
            setLoading(false);
        };
        fetchProduct();
    }, [id, form]);

    const onFinish = async (values: MyFormValues) => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:8080/api/v1/products/${id}`, values);
            message.success('Product updated successfully!');
            navigate("/product");
        } catch (error) {
            message.error('Error updating product. Please try again.');
        }
        setLoading(false);
    };

    const navigate = useNavigate();

    return (
        <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item
                label="Category"
                name={"categoryId"}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Select />
            </Form.Item>
            <Form.Item
                label="Title"
                name={["title"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Price"
                name={["price"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Parameters"
                name={["parameters"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Weight"
                name={["weight"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Volume"
                name={["volume"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Quantity In Stock"
                name={["quantityInStock"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Image URL"
                name={["imageUrl"]}
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
            </Form.Item>
        </Form>
    );
};

export default EditProductForm;
