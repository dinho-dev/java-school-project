import React from "react";
import { IResourceComponentsProps, useShow, useOne } from "@refinedev/core";
import { Show, NumberField } from "@refinedev/antd";
import { Typography } from "antd";

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

    return (
        <Show isLoading={isLoading}>
            <Title level={5}>Id</Title>
            <NumberField value={record?.id ?? ""} />
            <Title level={5}>Category</Title>
            {categoryIsLoading ? (
                <>Loading...</>
            ) : (
                <>{categoryData?.data?.id}</>
            )}
        </Show>
    );
};
