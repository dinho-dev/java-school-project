import React from "react";
import { IResourceComponentsProps, BaseRecord, useMany } from "@refinedev/core";
import { useTable, List, EditButton, ShowButton } from "@refinedev/antd";
import { Table, Space } from "antd";

export const CategoryList: React.FC<IResourceComponentsProps> = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((item) => item?.category) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title="Id" />
          <Table.Column dataIndex={["category"]} title="Category" />
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
                  </Space>
              )}
          />
        </Table>
      </List>
  );
};
