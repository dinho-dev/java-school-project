
/*export const ProductList: React.FC<IResourceComponentsProps> = () => {*/
  import React from "react";
  import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
  import {
    useTable,
    List,
    EditButton,
    ShowButton,
    DateField,
    TagField,
    EmailField,
  } from "@refinedev/antd";
  import { Table, Space } from "antd";

  export const ClientList: React.FC<IResourceComponentsProps> = () => {
    const { tableProps } = useTable({
      syncWithLocation: true,
    });

    /*
    {
        "id": 1,
        "name": "John",
        "surname": "Doe",
        "dateOfBirth": "1990-01-01",
    }
     */
    return (
        <List>


          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="id" title="Id" />
            <Table.Column dataIndex="name" title="Name" />
            <Table.Column dataIndex="surname" title="Surname" />
            <Table.Column
                dataIndex={["dateOfBirth"]}
                title="Date Of Birth"
                render={(value: any) => <DateField value={value} />}
            />
            <Table.Column
                dataIndex={["emailAddress"]}
                title="Email Address"
                render={(value: any) => <EmailField value={value} />}
            />
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
/*
  return <AntdListInferencer />;*/

