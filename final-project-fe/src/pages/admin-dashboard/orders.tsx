import React, { useState, useEffect } from "react";
import { Table, Tag, Select } from "antd";
import axios from "axios";

const { Option } = Select;

type Order = {
    id: number;
    customerName: string;
    orderDate: string;
    totalAmount: number;
    status: string;
};

const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get("/api/v1/orders");
        setOrders(response.data);
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Customer Name",
            dataIndex: "customerName",
            key: "customerName",
        },
        {
            title: "Order Date",
            dataIndex: "orderDate",
            key: "orderDate",
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "";
                switch (status) {
                    case "PAID":
                        color = "green";
                        break;
                    case "PENDING":
                        color = "orange";
                        break;
                    case "SHIPPED":
                        color = "blue";
                        break;
                    case "DELIVERED":
                        color = "purple";
                        break;
                    default:
                        color = "gray";
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: "Action",
            key: "action",
            render: (text: any, record: Order) => (
                <Select
                    defaultValue={record.status}
                    style={{ width: 120 }}
                    onChange={(value) => handleStatusChange(record.id, value)}
                >
                    <Option value="PAID">Paid</Option>
                    <Option value="PENDING">Pending</Option>
                    <Option value="SHIPPED">Shipped</Option>
                    <Option value="DELIVERED">Delivered</Option>
                </Select>
            ),
        },
    ];

    const handleStatusChange = async (orderId: number, status: string) => {
        const response = await axios.put(`/api/orders/${orderId}`, { status });
        if (response.status === 200) {
            fetchOrders();
        }
    };

    return <Table columns={columns} dataSource={orders} />;
};

export default Orders;
