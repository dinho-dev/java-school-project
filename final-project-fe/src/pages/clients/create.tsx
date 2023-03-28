import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";

export const ClientCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
              label="Name"
              name={["name"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label="Surname"
              name={["surname"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label="Date Of Birth"
              name={["dateOfBirth"]}
              rules={[
                {
                  required: true,
                },
              ]}
              getValueProps={(value) => ({
                value: value ? dayjs(value) : undefined,
              })}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
              label="Email Address"
              name={["emailAddress"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
              label="Password"
              name={["password"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Create>
  );
};
