import React, { useState, useEffect } from "react";
import {Table, Tag, Select, message, Button} from "antd";
import axios from "axios";
import Column from "antd/es/table/Column";
import { Product}  from "../products/list"

const { Option } = Select;
type OrderData = {
    id: number;
    userId: string;
    paymentMethod: string;
    deliveryMethod: string;
    payment_status: string;
    orderStatus: string;
    orderDate:string;
    products: Product[];
};
const UserOrders: React.FC = () => {
    const [order, setOrder] = useState<OrderData | null>(null);
    const [orders, setOrders] = useState<OrderData[]>([]);
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id') || '';

    const fetchOrders = async (id:string) => {
        try {
            const response = await axios.get<OrderData[]>(`http://localhost:8080/api/v1/orders/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setOrders(response.data); console.log(response.data)
        } catch (error) {
            console.error('Failed to fetch orders:', error);
        }
    };
    useEffect(() => {
        void fetchOrders(id);
    }, [id]);

    return (
        <Table<OrderData>
            dataSource={orders}
            size={"middle"}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            scroll={{ x: "max-content" }}
        >
            <Column title="ID" dataIndex="id" key="id" />
            <Column title="Customer Name" dataIndex="userId" key="userId" />
            <Column title="Order Date" dataIndex="orderDate" key="orderDate" />
            <Column title="Payment method" dataIndex="paymentMethod" key="paymentMethod" />
            <Column title="Delivery method" dataIndex="deliveryMethod" key="deliveryMethod" />
            <Column
                title="Total Amount"
               dataIndex="products"
                key="products"
                render={(products: Product[]) => {
                    let total = 0;

                    if (products == null || products.length == 0) {
                        return <p>{total} EUR</p>;
                    }
                    products.forEach(p => {
                        total += p.price
                    })
                    return <p>{total} EUR</p>;
                }}

            />
            <Column
                title="Status"
                dataIndex="orderStatus"
                key="orderStatus"
                render={(status: string) => {
                    let color = "";
                    switch (status) {
                        case "pending shipment":
                            color = "green";
                            break;
                        case "pending payment":
                            color = "orange";
                            break;
                        case "shipped":
                            color = "blue";
                            break;
                        case "delivered":
                            color = "purple";
                            break;
                        default:
                            color = "gray";
                    }
                    return <Tag color={color}>{status}</Tag>;
                }}
            />
            <Column
                title="Products"
                dataIndex="products"
                key="products"

                render={(products: Product[]) => {
                        // TODO Show product list within Order. Copy this to admin user
                        let names: string[] = [];

                        if (products == null || products.length == 0) {
                            return <p>{"No products"}</p>;
                        }
                        products.forEach(p => {
                                names.push(p.title)
                        })
                    return <p>{names.join(", ")}</p>;
                    }}
            />
        </Table>
    );
};

export default UserOrders;
