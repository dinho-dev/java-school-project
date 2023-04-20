import React, { useState, useEffect } from 'react';
import {Form, Input, Button, message, Checkbox} from 'antd';
import axios from 'axios';
import '@ant-design/cssinjs';
import {AddressData} from "../../App";

/*export interface AddressData {
    id: string;
    country: string;
    city: string;
    postalCode: number;
    street: string;
    home: number;
    apartment: string;
}*/
export interface PropsInterface {
    address:  AddressData,
    setAddress:  (address:AddressData)=>void
}


const Address = ({address, setAddress}) => {
    const [form] = Form.useForm();
    //const [address, setAddress] = useState<AddressData | null>(null);
   /* const [addresses, setAddresses] = useState<AddressData[]>([]);*/
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id') || ''; console.log(id)

    const fetchAddress = async (id: string | undefined) => {
        if (!id) {
            return;
        }

        try {
            const response = await axios.get<AddressData>(`http://localhost:8080/api/v1/address/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.data; console.log(data)
            console.log(setAddress, "ajkajsdaoa")
            setAddress(data);
        } catch (error) {
            console.error('Failed to fetch address:', error);
        }
    };


    useEffect(() => {
        fetchAddress(id);
    }, [id]);

    const createAddress = async (address: AddressData, userId: string) => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/address', {...address, userId : userId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });console.log({...address, userId: userId});
            message.success('Address created');
            console.log('Address created:', response.data);
        } catch (error) {
            console.error('Failed to create address:', error);
        }
    };

    const updateAddress = async (address: AddressData, userId: string) => {
        try {
            const response = await axios.put(`http://localhost:8080/api/v1/address/update/${address.id}`, {...address, userId: userId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            message.success('Address updated');
            console.log('Address updated:', response.data);
        } catch (error) {
            console.error('Failed to update address:', error);
        }
    };


    const handleSubmit = async (values: AddressData) => {
        console.log(values)
        setAddress(values)
        // TODO !address -> !address.id
        if (!address.id) {
            createAddress(values, id);
        } else {
            updateAddress({ ...address, ...values }, id);
        }
/*        if (address) {
            onSelect(address.id);
        }*/
    };

    useEffect(() => {
        if (address) {
            form.setFieldsValue({
                country: address.country,
                city: address.city,
                postalCode: address.postalCode,
                street: address.street,
                home: address.home,
                apartment: address.apartment,
            });
        }
    }, [address]);


    return (
        <>
            <Checkbox
                checked={componentDisabled}
                onChange={(e) => setComponentDisabled(e.target.checked)}
            >
                Form disabled
            </Checkbox>
            <Form disabled={componentDisabled} form={form} onFinish={handleSubmit} initialValues={address}>
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
        </>

    );
};

export default Address;
