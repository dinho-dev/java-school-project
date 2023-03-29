import React from "react";
import {IResourceComponentsProps, BaseRecord} from "@refinedev/core";
import {useTable, List, ImageField, EditButton, ShowButton, DeleteButton} from "@refinedev/antd";
import {Table, Space, Button} from "antd";
import {ContainerFilled, ShoppingCartOutlined} from "@ant-design/icons";
import {AddToShoppingCart} from "../../components/add-to-shopping-cart";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
    const {tableProps} = useTable({
        syncWithLocation: true,
    });

    /*
    {
        "id": 1,
        "title": "Macbook Pro",
        "price": 1000,
        "imageUrl": "https://www.apple.com/v/macbook-pro-13/og/images/og-macbook-pro-13__d2x2q2j0q2y6_large.jpg?202009171946"
     }
     */
    return (
        <List>
            <Table {...tableProps} rowKey="id">

                <Table.Column dataIndex="title" title="Title"/>
                <Table.Column dataIndex="price" title="Price $"/>
                <Table.Column dataIndex="parameters" title="Parameters" width="10%"/>
                <Table.Column dataIndex="quantityInStock" title="Quantity in stock"/>
                <Table.Column
                    title="Image"
                    dataIndex="imageUrl"
                    render={(_, record: BaseRecord) => (
                        <ImageField
                            value={record.imageUrl}
                            width={200}
                        />
                    )}
                    width="10%"
                />
                <Table.Column
                    title="Actions"
                    dataIndex="actions"
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <EditButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <ShowButton
                                hideText
                                size="small"
                                recordItemId={record.id}
                            />
                            <AddToShoppingCart
                                recordItemId={record.id}
                                resource={record.title}
                                price={record.price}
                            />
                            <DeleteButton
                                resource="products"
                                recordItemId={record.id}
                            />

                        </Space>
                    )}
                />
            </Table>
        </List>
    );
};
