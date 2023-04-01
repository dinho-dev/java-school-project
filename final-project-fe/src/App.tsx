import { Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';
import {
    HomeTwoTone, InfoCircleOutlined, LaptopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import ProductList from "./pages/products/list";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import CreateProductForm from "./pages/products/create";
import EditProductForm from "./pages/products/edit";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

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
                    <Menu.Item key="3" icon={<InfoCircleOutlined />}>
                        <Link to="/about">About</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route path="/products" element={<ProductList />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/product/create" element={<CreateProductForm/>} />
                        <Route path="/product/edit" element={<EditProductForm/>} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
};

export default App;
