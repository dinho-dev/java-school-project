import React, { useState } from "react";
import {Button, Form, Radio, Select, message, Input} from "antd";
import Address from "../profile/address";
import axios, { AxiosError } from 'axios';
import {AddressData} from "../../App";

/*interface CheckoutFormProps {
    addresses: AddressData[];
    onSubmit: (formData: any) => void;
}*/

const { Option } = Select;
export interface PropsInterface {
    address:  any,
    setAddress:  React.Dispatch<any>
}
const CheckoutForm = ({address, setAddress}:PropsInterface) => {


    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id') || ''; console.log(id)
    React.useEffect(()=> {
        const fetchAddress = async (id: string | undefined) => {
            try {
                const response = await axios.get<AddressData>(`http://localhost:8080/api/v1/address/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.data; console.log(data, "This is address")
                setAddress(data);
            } catch (error) {
                console.error('Failed to fetch address:', error);
            }
        };
        fetchAddress(id)
    }, [id]);
    const handleSubmit = (values: any, addressId: string | null) => {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("id"); console.log(userId)
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        axios
            .post(
                "http://localhost:8080/api/v1/orders",
                {
                    ...values,
                    addressId: addressId,
                    userId: userId,
                    orderDate: new Date().toISOString(),
                },
                config
            )
            .then(() => {
                // TODO remove cart, because we made an order
                localStorage.removeItem('cartItems');
                message.success("Order placed successfully");
            })
            .catch((error) => {
                console.log("Error placing order:", error);
                message.error("Failed to place order");
            });
    };

    return (
        <Form initialValues={address} onFinish={(values) => handleSubmit(values, address?.id || null)}>
        <Form.Item name="address" label="Delivery Address">
                <div>
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
                </div>
            </Form.Item>
            <Form.Item name="paymentMethod" label="Payment Method">
                <Select>
                    <Option value="Cash">Cash</Option>
                    <Option value="By card">By Card</Option>
                </Select>
            </Form.Item>

            <Form.Item name="deliveryMethod" label="Delivery Method">
                <Select>
                    <Option value="International">International</Option>
                    <Option value="Pick-up">Pick-up</Option>
                    <Option value="DHL">DHL</Option>
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Place Order
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CheckoutForm;
