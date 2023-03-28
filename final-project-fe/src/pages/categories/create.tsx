import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const CategoryCreate: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
  });

  return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
              label="Category"
              name={"category"}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Select {...categorySelectProps} />
          </Form.Item>
        </Form>
      </Create>
  );
};
