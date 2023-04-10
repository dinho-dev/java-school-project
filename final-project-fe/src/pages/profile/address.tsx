import { useState, useEffect } from 'react';
import {Form, Input, Button, message} from 'antd';
import axios from 'axios';
import '@ant-design/cssinjs';
import { useParams } from 'react-router-dom';

interface AddressData {
    id: string;
    country: string;
    city: string;
    postalCode: number;
    street: string;
    home: number;
    apartment: string;
}

const Address: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [form] = Form.useForm();
    const [address, setAddress] = useState<AddressData | null>(null);
    const [addresses, setAddresses] = useState<AddressData[]>([]);

    const token = localStorage.getItem('token');

    const fetchAddresses = async (userId?: string) => {
        if (!userId) {
            return;
        }

        try {
            const response = await axios.get<AddressData[]>(
                `http://localhost:8080/api/v1/address?user_id=${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setAddresses(response.data);
        } catch (error) {
            console.error('Failed to fetch addresses:', error);
        }
    };

    const fetchAddress = async (id: string | undefined) => {
        if (!id) {
            return;
        }

        try {
            const response = await axios.get<AddressData>(`http://localhost:8080/api/v1/address/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAddress(response.data);
        } catch (error) {
            console.error('Failed to fetch address:', error);
        }
    };

    useEffect(() => {
        fetchAddresses(id);
        fetchAddress(id);
    }, [id]);

    const handleSubmit = async (values: AddressData) => {
        try {
            await axios.post(`http://localhost:8080/api/v1/users/${id}/address`, values);
            fetchAddresses(id);
        } catch (error) {
            console.error('Failed to save address:', error);
        }
    };

    if (!address) {
        return <div>Loading...</div>;
    }

    return (
        <Form form={form} onFinish={handleSubmit}>
            <Form.Item name="country" label="Country">
                <Input />
            </Form.Item>
            <Form.Item name="city" label="City">
                <Input />
            </Form.Item>
            <Form.Item name="postalCode" label="Postal Code">
                <Input type="number" />
            </Form.Item>
            <Form.Item name="street" label="Street">
                <Input />
            </Form.Item>
            <Form.Item name="home" label="House Number">
                <Input type="number" />
            </Form.Item>
            <Form.Item name="apartment" label="Apartment Number">
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Address;
