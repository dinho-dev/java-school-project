import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import { useTable, List, ImageField, EditButton, ShowButton } from "@refinedev/antd";
import {Table, Space, Button} from "antd";
import {ContainerFilled, ShoppingCartOutlined} from "@ant-design/icons";

export const ProductList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
      <List>
        <Table {...tableProps} rowKey="id">

          <Table.Column dataIndex="title" title="Title" />
          <Table.Column dataIndex="price" title="Price $" />
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
                      <Button
                          icon={<ShoppingCartOutlined />}
                      >
                          Add to shopping cart
                      </Button>
                  </Space>
              )}
          />
        </Table>
      </List>
  );
};
