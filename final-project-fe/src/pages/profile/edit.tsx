import React, { useEffect, useState } from "react";
import axios from "axios";
import {Form, Input, Select, Button, message, Layout, DatePicker, Checkbox} from 'antd';
import '@ant-design/cssinjs';
import { useNavigate, useParams } from "react-router-dom";
import {Content} from "antd/es/layout/layout";

const EditProfileForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserValues>();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);


interface UserValues {
  firstname: string;
  lastname: string;
  dateOfBirth: Date;
  email: string;
  password: string;
  role: string;

}
    // Fetch user
    const id = localStorage.getItem('id'); console.log(id)
    const token = localStorage.getItem('token');


    useEffect(() => {
        if (!id) {
            message.error('User ID is undefined');
            return;
        }

        const fetchUser = async (id: string) => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
                form.setFieldsValue(response.data);
            } catch (error) {
                message.error('Error fetching profile. Please try again.');
            }
            setLoading(false);
        };

        fetchUser(id);
    }, [id, form, token]);

    // update the user
    const onFinish = async (values: UserValues) => {
    setLoading(true);
    try {
      await axios.put(`http://localhost:8080/api/v1/users/update/${id}`, { ...values, id }, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      });
      message.success('User profile updated successfully!');
    } catch (error) {
      message.error('Error updating profile. Please try again.');
    }
    setLoading(false);
  };


  return (
      <>
          <Checkbox
              checked={componentDisabled}
              onChange={(e) => setComponentDisabled(e.target.checked)}
          >
              Form disabled
          </Checkbox>
          <Form disabled={componentDisabled} layout="vertical" onFinish={onFinish} form={form}>

              <Form.Item
                  label="Name"
                  name={"firstname"}
                  rules={[
                      {
                          required: true,
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  label="Last name"
                  name={["lastname"]}
                  rules={[
                      {
                          required: true,
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  label="Date of birth"
                  name={["dateOfBirth"]}
                  rules={[
                      {
                          required: true,
                      },
                  ]}
              >
                  <Input />
              </Form.Item>
              <Form.Item
                  label="Email"
                  name={["email"]}
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
              <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>Save</Button>
              </Form.Item>
          </Form>
      </>
  );
};

export default EditProfileForm;
