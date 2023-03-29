import React from "react";
import { IResourceComponentsProps, useShow, useMany } from "@refinedev/core";
import { Show, TagField, TextField } from "@refinedev/antd";
import {Table, Typography} from "antd";

const { Title } = Typography;

export const OrderShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;
    const products = record?.products || [];
    const { data: productsData, isLoading: productsIsLoading } = useMany({
        resource: "products",
        ids: record?.products || [],
        queryOptions: {
            enabled: !!record,
        },
    });

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <TextField value={record?.id} />
            <Title level={5}>Order Status</Title>
            <TextField value={record?.orderStatus} />
            <Title level={5}>Products</Title>
            {productsIsLoading ? <>Loading...</> : <></>}
            <Table
                dataSource={products?.data}
                rowKey="id"
                pagination={false}
            >
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="name" title="Name" />
                <Table.Column dataIndex="price" title="Price" />
                <Table.Column dataIndex="category" title="Category" />
                <Table.Column dataIndex="image" title="Image" />
                <Table.Column dataIndex="status" title="Status" />
                <Table.Column dataIndex="createdAt" title="Created At" />
                <Table.Column dataIndex="updatedAt" title="Updated At" />
            </Table>
        </Show>
    );
};
