import React from "react";
import {IResourceComponentsProps, useShow, useOne, useMany} from "@refinedev/core";
import { Show, NumberField } from "@refinedev/antd";
import {Table, Typography} from "antd";

const { Title } = Typography;

export const CategoryShow: React.FC<IResourceComponentsProps> = () => {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    const { data: categoryData, isLoading: categoryIsLoading } = useOne({
        resource: "categories",
        id: record?.category || "",
        queryOptions: {
            enabled: !!record,
        },
    });

    const { data: productsData, isLoading: productsIsLoading } = useMany({
        resource: "products",
        ids: record?.products || [],
        queryOptions: {
            enabled: !!record,
        },
    });
    let products = productsData?.data.filter((product) => product.category === record?.id)

    return (
        <Show >
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Category name</Title>
            <Title>{categoryData?.data?.category}</Title>
            <Title level={5}>Category</Title>
            {categoryIsLoading ? (
                <>Loading...</>
            ) : (
                <>{categoryData?.data?.id}</>
            )}

            <Table
                dataSource={products}
                rowKey="id"
                pagination={false}
            >
                <Table.Column dataIndex="id" title="Id" />
                <Table.Column dataIndex="name" title="Name" />
                <Table.Column dataIndex="price" title="Price" />
                <Table.Column dataIndex="image" title="Image" />
            </Table>
        </Show>
    );
};
