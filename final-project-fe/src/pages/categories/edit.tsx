import React from "react";
import { IResourceComponentsProps } from "@refinedev/core";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const CategoryEdit: React.FC<IResourceComponentsProps> = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const categoriesData = queryResult?.data?.data;

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    defaultValue: categoriesData?.category,
  });

  return (
      <Edit saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <Form.Item
              label="Id"
              name={["id"]}
              rules={[
                {
                  required: true,
                },
              ]}
          >
            <Input readOnly disabled />
          </Form.Item>
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
      </Edit>
  );
};
