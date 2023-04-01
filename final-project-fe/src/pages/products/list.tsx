import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Space} from "antd";
import Image from "antd/es/image";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import type { SpaceSize } from 'antd/es/space';
interface Product {
    id: string;
    categoryId: number;
    title: string;
    price: number;
    parameters: string;
    weight: string;
    volume: string;
    quantityInStock: number;
    imageUrl: string;
}

const ProductListConst = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
    /*const [size, setSize] = useState<SpaceSize | [SpaceSize, SpaceSize]>('small');*/

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/products").then((response) => {
            const data = response.data;
            setProducts(data);
        });
    }, []);

    const handleDelete = async (id: string) => {
        await axios.delete(`http://localhost:8080/api/v1/products/${id}`);
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
    };

    return (
        <div >
            <div>
                <Link to="/product/create">
                    <Button type="primary">Create</Button>
                </Link>
            </div>
            <Row gutter={[12, 12]}>
                {products.map((product) => (
                    <Col xs={24} sm={12} md={8} key={product.id}>
                        <Card
                            hoverable
                            cover={
                                <Image
                                    src={product.imageUrl}
                                    alt={product.title}
                                    style={{ objectFit: "contain", height:"200px", width:"ml-auto" }}
                                />
                            }
                        >
                            <Card.Meta
                                title={product.title}
                                description={`$${product.price}`}
                            />
                            <div style={{ marginTop: 16 }}>
                                <Link to={`/product/edit/${product.id}`}>
                                    <Button icon={<EditOutlined />} type="primary" />
                                </Link>
                                <Button
                                    icon={<DeleteOutlined />}
                                    type="primary"
                                    danger
                                    style={{ marginLeft: 8 }}
                                    onClick={() => handleDelete(product.id)}
                                />
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

function ProductList() {
    return (
        <div className="ProductList">
            <ProductListConst />
        </div>
    );
}

export default ProductList;
