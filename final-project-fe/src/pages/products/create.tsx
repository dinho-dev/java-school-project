import React, { useState } from "react";
import axios from "axios";
import { Form, Input, Select, Button, message } from "antd";
import '@ant-design/cssinjs';
import { useNavigate } from "react-router-dom";

const CreateProductForm = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate(); // add useNavigate hook
    const [loading, setLoading] = useState(false);

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

    const onFinish = async (values: MyFormValues) => { // update type of values to MyFormValues
        setLoading(true);
        try {
            await axios.post("http://localhost:8080/api/v1/products", values);
            message.success("Product created successfully!"); // update success message
            form.resetFields(); // reset form fields
            navigate("/product"); // navigate to product page
        } catch (error) {
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
                <Select />
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
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Create
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateProductForm; // don't forget to export the component
