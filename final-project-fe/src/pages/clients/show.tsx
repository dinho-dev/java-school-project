import React from "react";
import { IResourceComponentsProps, useShow } from "@refinedev/core";
import {
  Show,
  TagField,
  TextField,
  DateField,
  EmailField,
} from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ClientShow: React.FC<IResourceComponentsProps> = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
      <Show isLoading={isLoading}>
        <Title level={5}>Id</Title>
        <TextField value={record?.id} />
        <Title level={5}>Name</Title>
        <TextField value={record?.name} />
        <Title level={5}>Surname</Title>
        <TextField value={record?.surname} />
        <Title level={5}>Date Of Birth</Title>
        <DateField value={record?.dateOfBirth} />
        <Title level={5}>Email Address</Title>
        <EmailField value={record?.emailAddress} />
        <Title level={5}>Password</Title>
        <TextField value={record?.password} />
      </Show>
  );
};
