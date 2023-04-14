import React, { useState, useEffect } from 'react';
import {Layout, Table, Button, Modal, Form, Input, message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Content } = Layout;
export interface CategoryValues {
    id: number;
    categoryName: string;
}
const token = localStorage.getItem('token');
const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);


    // Fetch categories from backend
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.log(err));
    }, []);


    // New category
    const onFinish = async (values: CategoryValues) => {
        setLoading(true);
        try {
            await axios.post("http://localhost:8080/api/v1/categories", values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            message.success("Category created successfully!");
            form.resetFields();
            /*navigate("/products");*/
        } catch (error) {
            console.log(error)
            message.error("Error creating new category. Please try again.");
        }
        setLoading(false);
    };


    // Table columns for displaying categories
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'categoryName',
            key: 'name',
            editable: true,
        },
        {
            title: 'Action',
            key: 'action',
            render: (index:number, record:CategoryValues) => { //if a row is being edited, render the editable form fields. Otherwise, render the regular text fields:
                const editable = record.id.toString() === editingKey;
                return editable ? (
                    <Form form={form} onFinish={() => onSave(record)}>
                        <Form.Item name="categoryName" initialValue={record.categoryName}>
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">Save</Button>
                        <Button onClick={() => onCancel()} style={{ marginLeft: 8 }}>Cancel</Button>
                    </Form>
                ) : (
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                        <Button type="primary" ghost onClick={() => onEdit(record)}>Edit</Button>
                        <Button type="primary" danger ghost onClick={() => handleDelete(record.id)}>Delete</Button>
                    </div>
                );
            },
        },
    ];

    // Handle category edit
    // activated when click the edit button
    const [editingKey, setEditingKey] = useState('');

    const onEdit = (record: CategoryValues) => {
        setEditingKey(record.id.toString());
    };
    //will be called when the save and cancel buttons are clicked
    const onSave = async (record: CategoryValues) => {
        try {
            const values = await form.validateFields();
            form.setFieldsValue({ categoryName: values.categoryName });
            await axios.put(`http://localhost:8080/api/v1/categories/update/${record.id}`, values, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            message.success("Category updated successfully!");
            setEditingKey('');
        } catch (error) {
            console.log(error);
            message.error("Error updating category. Please try again.");
        }
    };

    const onCancel = () => {
        setEditingKey('');
    };

    // Handle category deletion
    const handleDelete = async (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this category?',
            onOk: async () => {
                try {
                    await axios.delete(`http://localhost:8080/api/v1/categories/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    message.warning("Category was deleted!");
                    setCategories((prevCategories) =>
                        prevCategories.filter((category: CategoryValues) => category.id !== id)
                    );
                } catch (error) {
                    console.log(error);
                    message.error("Error deleting category. Please try again.");
                }
            },
        });
    };

    return (
        <Layout>
            <Content>
                <div style={{ padding: '24px', background: '#fff', minHeight: '360px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                        <Button type="primary" onClick={() => setIsModalVisible(true)} icon={<PlusOutlined />}>
                            Create New Category
                        </Button>
                    </div>
                    <Table dataSource={categories} columns={columns} rowKey="id" />
                    <Modal title="Create New Category" visible={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null}>
                        <Form form={form} onFinish={onFinish}>
                            <Form.Item name="categoryName" label="Name" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                            <Button type="primary" htmlType="submit">Create</Button>
                        </Form>
                    </Modal>
                </div>
            </Content>
        </Layout>
    );
};

export default CategoryList;
