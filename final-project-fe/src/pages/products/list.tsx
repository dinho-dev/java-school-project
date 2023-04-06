import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Row, Col, Space, Select, Slider } from "antd";
import Image from "antd/es/image";

import {
    DeleteOutlined, DollarCircleOutlined,
    EditOutlined,
    FilterOutlined,
} from "@ant-design/icons";

import type { SpaceSize } from "antd/es/space";
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

const { Option } = Select;

const marks = {
    0: "$0",
    500: "$500",
    1000: "$1000",
    1500: "$1500",
    2000: "$2000",
    2500: "$2500",
};

const ProductListConst = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
    const [selectedParameter, setSelectedParameter] = useState<string>("");
    const [selectedPriceRange, setSelectedPriceRange] = useState<number[]>([
        0,
        3000,
    ]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [selectedWeight, setSelectedWeight] = useState<string>("");
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const sortProductsByWeight = (products: Product[]) => {
        const sortedProducts = [...products].sort((a, b) => {
            const weightA = parseFloat(a.weight.replace(/[^0-9.-]+/g, ""));
            const weightB = parseFloat(b.weight.replace(/[^0-9.-]+/g, ""));
            if (sortOrder === "asc") {
                return weightA - weightB;
            } else {
                return weightB - weightA;
            }
        });
        return sortedProducts;
    };
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/products").then((response) => {
            const data = response.data;
            setProducts(data);
            setFilteredProducts(data);
        });
    }, []);

    useEffect(() => {
        let tempProducts = products;
        if (selectedParameter) {
            tempProducts = tempProducts.filter((product) =>
                product.parameters.includes(selectedParameter)
            );
        }
        tempProducts = tempProducts.filter(
            (product) =>
                product.price >= selectedPriceRange[0] &&
                product.price <= selectedPriceRange[1]
        );
        if (selectedCategory) {
            tempProducts = tempProducts.filter(
                (product) => product.categoryId === selectedCategory
            );
        }
        if (selectedWeight) {
            tempProducts = tempProducts.filter(
                (product) => product.weight.includes(selectedWeight)
            );
        }
        tempProducts = sortProductsByWeight(tempProducts);
        setFilteredProducts(tempProducts);
    }, [selectedParameter, selectedPriceRange, selectedCategory, selectedWeight, products, sortOrder]);


    const handleDelete = async (id: string) => {
        await axios.delete(`http://localhost:8080/api/v1/products/${id}`);
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
    };

    const handleSelectChange = (value: string) => {
        setSelectedParameter(value);
    };

    const handlePriceRangeChange = (value: number[]) => {
        setSelectedPriceRange(value);
    };

    const handleCategoryChange = (value: number) => {
        setSelectedCategory(value);
    };
    const handleWeightChange = (value: string) => {
        setSelectedWeight(value);
    };

    const handleSortChange = () => {
        setIsAscending(!isAscending);
    };

    return (
        <div>
            <div>
                <Link to="/product/create">
                    <Button type="primary">Create</Button>
                </Link>
                <Select defaultValue={selectedCategory} onChange={handleCategoryChange} style={{ width: 120 }}>
                    <Option value={0}>All Categories</Option>
                    <Option value={1}>Laptops</Option>
                    <Option value={2}>Smartphones</Option>
                    <Option value={3}>Headphones</Option>
                    <Option value={4}>Smartwatches</Option>
                    <Option value={5}>Gaming consoles</Option>
                </Select>
                <Select
                    defaultValue={sortOrder}
                    onChange={(value) => setSortOrder(value)}
                    style={{ width: 120, marginRight: 16 }}
                >
                    <Option value="">Sort by weight</Option>
                    <Option value="asc">Ascending</Option>
                    <Option value="desc">Descending</Option>
                </Select>

                <Select
                    value={selectedParameter}
                    onChange={handleSelectChange}
                    style={{ width: 120, marginLeft: 16 }}
                >
                    <Option value="">All</Option>
                    <Option value="parameter">black</Option>
                    <Option value="parameter2">Parameter 2</Option>
                    <Option value="parameter3">Parameter 3</Option>
                </Select>
                <div style={{ marginLeft: 16}}>
                    <Slider
                        range
                        min={0}
                        max={3000}
                        step={50}
                        onChange={handlePriceRangeChange}
                        style={{ width: 240 }}
                    />
                    <span style={{marginLeft: 8, marginRight: 16}}>
                        {`Price: $${selectedPriceRange[0]} - $${selectedPriceRange[1]}`}
                    </span>
                </div>
            </div>
            <Row gutter={[12, 12]}>
                {filteredProducts.map((product) => (
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
    const currentUser = { role: 'ADMIN' };
    return (
        <div className="Product">
            <ProductListConst />
        </div>
    );
}

export default ProductList;
