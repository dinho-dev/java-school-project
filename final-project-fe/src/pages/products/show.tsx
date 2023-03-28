import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import { Show, TagField, TextField, NumberField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ProductShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
        <Title level={5}>Title</Title>
        <TextField value={record?.title} />
        <Title level={5}>Price</Title>
        <NumberField value={record?.price ?? ""} />


      </Show>
  );
};
