import React from "react";
import {BaseRecord, IResourceComponentsProps, useShow} from "@refinedev/core";
import {Show, TagField, TextField, NumberField, EditButton, ShowButton, List} from "@refinedev/antd";
import {Button, Divider, Space, Table, Typography} from "antd";
import {DeleteRowOutlined, ShoppingCartOutlined} from "@ant-design/icons";
import {useNotification} from "@refinedev/core";
import axios from "axios";

const {Title} = Typography;

export const ShowShoppingCart: React.FC<IResourceComponentsProps> = () => {

    // Get items from local storage
    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    const {open} = useNotification();

    return (
        <Show>
            <Title level={5}>Your shopping cart items:</Title>
            {/* A table with all items from shopping cart */}
            <Table
                dataSource={shoppingCart}
                pagination={false}
            >
                <Table.Column dataIndex="id" title="Id"/>
                <Table.Column dataIndex="title" title="Title"/>
                <Table.Column dataIndex="price" title="Price $"/>
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                                resourceNameOrRouteName="products"
                            />
                            <Button
                                icon={<DeleteRowOutlined/>}
                                size="small"
                                onClick={() => {
                                    // Remove item from shopping cart
                                    const shoppingCart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
                                    const newShoppingCart = shoppingCart.filter((item: any) => item.id !== record.id);
                                    localStorage.setItem('shoppingCart', JSON.stringify(newShoppingCart));
                                    window.location.reload();
                                }}

                            />
                        </Space>

                    )}
                />
            </Table>
            <Space split={<Divider type="vertical"/>}></Space>
            <Space style={{marginLeft: "8px"}}>


                <Title level={5}>Total price: {shoppingCart.reduce((a: any, b: any) => a + b.price, 0)}€</Title>
                <Button
                    type={"primary"}
                    onClick={() => {
                        // Remove all items from shopping cart
                        // Show notification that item was added to shopping cart

                        // Wait for 5 seconds and reload page

                        axios.post('http://localhost:8080/api/v1/orders/create-with-products', {
                            products: shoppingCart
                        }).then((response) => {
                            open?.({
                                type: "success",
                                description: "Congrats with your purchase!",
                                message: "total price: " + shoppingCart.reduce((a: any, b: any) => a + b.price, 0) + "€.",
                                key: "purchase"
                            });
                        }).catch((error) => {
                            open?.({
                                type: "error",
                                description: "Payment failed",
                                message: "total price failed: " + shoppingCart.reduce((a: any, b: any) => a + b.price, 0) + "€.",
                                key: "purchase"
                            });
                        })


                        setTimeout(() => {
                            // send request to backend to create order


                        }, 2000);

                        // localStorage.removeItem('shoppingCart');

                    }}
                >
                    Buy items
                </Button>

            </Space>


        </Show>
    );
};
