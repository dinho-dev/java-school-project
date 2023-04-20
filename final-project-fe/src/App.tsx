import { Routes, Route, Link } from 'react-router-dom';
import React, {useContext, useState} from 'react';
import {
    HomeTwoTone, InfoCircleOutlined, LaptopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined, UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Pagination, Button } from 'antd';
import ProductList from "./pages/products/list";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import CreateProductForm from "./pages/products/create";
import EditProductForm from "./pages/products/edit";
import RegistrationForm from "./pages/Registration";
import Login from "./pages/Login";
import LogoutButton from "./components/LogoutButton";
import HeaderButtons from "./components/HeaderButtons";
import EditProfileForm from "./pages/profile/edit";
import {Profile} from "./pages/profile";
import Address from "./pages/profile/address";
import {Dashboard} from "./pages/admin-dashboard/dashboard";
import Checkout from "./pages/checkout/checkout";
import axios from "axios";


const { Header, Sider, Content } = Layout;
export interface AddressData {
    id: string;
    country: string;
    city: string;
    postalCode: number;
    street: string;
    home: number;
    apartment: string;
}
const App: React.FC = () => {

    const [address, setAddress] = useState <AddressData> ({
        id: "",
        country: "",
        city: "",
        postalCode: 0,
        street: "",
        home: 0,
        apartment: "",

    });

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const role = localStorage.getItem('role');
    const isUser = role === 'USER';
    const isAdmin = role === 'ADMIN';
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    ><Menu.Item key="1" icon={<HomeTwoTone />}>
                    <Link to="/home">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<LaptopOutlined />}>
                        <Link to="/products">Products</Link>
                    </Menu.Item>
                    {isUser && (
                        <Menu.Item key="3" icon={<UserOutlined />}>
                            <Link to="/profile">Profile</Link>
                        </Menu.Item>
                    )}
                    {isAdmin && (
                        <Menu.Item key="3" icon={<UserOutlined />}>
                            <Link to="/dashboard">Dashboard</Link>
                         </Menu.Item>
                    )}

                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    <HeaderButtons  />

                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 700,
                        background: colorBgContainer,
                    }}
                >
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile/" element={<Profile address={address} setAddress={setAddress}/>} />
                        <Route path="/profile/edit/:id" element={<EditProfileForm />} />
                        <Route path="/profile/address/:id" element={<Address address={address} setAddress={setAddress}/>} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/checkout" element={<Checkout address={address} setAddress={setAddress}/>} />

                        <Route path="/register" element={<RegistrationForm />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<LogoutButton />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/product/create" element={<CreateProductForm/>} />
                        <Route path="/product/edit/:id" element={<EditProductForm/>} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
