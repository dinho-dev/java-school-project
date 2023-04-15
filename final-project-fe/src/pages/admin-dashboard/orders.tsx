import React, { useState, useEffect } from "react";
import {Table, Tag, Select, message, Button} from "antd";
import axios from "axios";

const { Option } = Select;
type Order = {
    id: number;
    userId: string;
    paymentMethod: string;
    deliveryMethod: string;
    payment_status: string;
    orderStatus: string;
    orderDate:string;
    totalAmount: number;
};
const token = localStorage.getItem('token');
const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
    const [editingOrderStatus, setEditingOrderStatus] = useState<string>("");
    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get("http://localhost:8080/api/v1/orders",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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
            dataIndex: "userId",
            key: "userId",
        },
        {
            title: "Order Date",
            dataIndex: "orderDate",
            key: "orderDate",
        },
        {
            title: "Payment method",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
        },
        {
            title: "Delivery method",
            dataIndex: "deliveryMethod",
            key: "deliveryMethod",
        },
        {
            title: "Total Amount",
            dataIndex: "totalAmount",
            key: "totalAmount",
        },
        {
            title: "Status",
            dataIndex: "orderStatus",
            key: "orderStatus",
            render: (status: string) => {
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
            },
        },
        {
            title: "Action",
            key: "action",
            render: (text: any, record: Order) => {
                if (editingOrderId === record.id) {
                    return (
                        <>
                            <Select
                                value={editingOrderStatus}
                                style={{ width: 120 }}
                                onChange={(value) => setEditingOrderStatus(value)}
                            >
                                <Option value="pending shipment">Paid</Option>
                                <Option value="pending payment">Pending</Option>
                                <Option value="shipped">Shipped</Option>
                                <Option value="delivered">Delivered</Option>
                            </Select>
                            <Button
                                type="primary"
                                onClick={() => handleSaveStatusChange(record.id)}
                            >
                                Save
                            </Button>
                            <Button onClick={() => handleCancelStatusChange()}>Cancel</Button>
                        </>
                    );
                } else {
                    return (
                        <Button onClick={() => handleEditStatusChange(record)}>
                            Edit
                        </Button>
                    );
                }
            },
        },
    ];
    const handleEditStatusChange = (record: Order) => {
        setEditingOrderId(record.id);
        setEditingOrderStatus(record.orderStatus);
    };

    const handleSaveStatusChange = async (orderId: number) => {
        const response = await axios.put(
            `http://localhost:8080/api/v1/orders/${orderId}`,
            { orderStatus: editingOrderStatus },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status === 200) {
            setEditingOrderId(null);
            setEditingOrderStatus("");
            fetchOrders();
        }
    };

    const handleCancelStatusChange = () => {
        setEditingOrderId(null);
        setEditingOrderStatus("");
    };


    return <Table columns={columns} dataSource={orders} />;
};

export default Orders;
