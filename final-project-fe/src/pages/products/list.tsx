import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {Card, Button, Row, Col, Select, Slider, Input, message, Pagination} from "antd";
import Image from "antd/es/image";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
interface User {
    role: string;
}

const { Option } = Select;

const marks = {
    0: "$0",
    750: "$750",
    1500: "$1500",
    2250: "2250",
    3000: "$3000"
};

const ProductListConst = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const navigate = useNavigate();
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
    const [user, setUser] = useState<User>({ role: '' });
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');

        if (token && role) {
            setUser({ role });
        }
    }, []);
    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/products").then((response) => {
            const data = response.data;
            setProducts(data);
            setFilteredProducts(data);
        });
    }, []);

    useEffect(() => {
        let tempProducts = products;

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
    }, [selectedPriceRange, selectedCategory, selectedWeight, products, sortOrder]);


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
    const { Search } = Input;
/*    const onSearch = (value: string) => console.log(value);*/
    const [searchText, setSearchText] = useState("");

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const searchText = event.target.value.toLowerCase();
        const filteredProducts = products.filter((product) => {
            const title = product.title.toLowerCase();
            const parameters = product.parameters.toLowerCase();
            return title.includes(searchText) || parameters.includes(searchText);
        });
        setFilteredProducts(filteredProducts);
        setSearchText(event.target.value);
    };
    const token = localStorage.getItem('token');
    const handleDelete = async (id: string) => {
        await axios.delete(`http://localhost:8080/api/v1/products/delete/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        message.warning("Product was deleted!");
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== id)
        );
        console.log(error)
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const slicedProducts = filteredProducts.slice(startIndex, endIndex);


    return (
        <div>
            <div>
                <Link to="/product/create">
                    {user.role === 'ADMIN' && (
                    <Button type="primary">Create</Button>
                    )}
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
                <Search type="text" placeholder="Search products" value={searchText} onChange={handleSearch} style={{ width: 200 }} />
                <div style={{ marginLeft: 16}}>
                    <Slider
                        range
                        min={0}
                        max={3000}
                        step={50}
                        marks={marks}
                        onChange={handlePriceRangeChange}
                        style={{ width: 240 }}
                    />
                    <span style={{marginLeft: 8, marginRight: 16}}>
                        {`Price: $${selectedPriceRange[0]} - $${selectedPriceRange[1]}`}
                    </span>
                </div>
            </div>
            <Row gutter={[12, 12]}>
                {slicedProducts.map((product) => (
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
                                description={
                                    <div>
                                        <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
                                            ${product.price}
                                        </div>
                                        <div style={{ marginTop: 8 }}>
                                            <span style={{ fontWeight: "bold" }}>Parameters:</span> {product.parameters}
                                        </div>
                                        <div style={{ marginTop: 8 }}>
                                            <span style={{ fontWeight: "bold" }}>Weight:</span> {product.weight}
                                        </div>
                                    </div>
                                }
                            />
                            <div style={{ marginTop: 16 }}>
                                <Link to={`/product/edit/${product.id}`}>
                                    {user.role === 'ADMIN' && (
                                        <Button icon={<EditOutlined />} type="primary" />
                                    )}
                                </Link>
                                {user.role === 'ADMIN' && (
                                    <Button
                                        icon={<DeleteOutlined />}
                                        type="primary"
                                        danger
                                        style={{ marginLeft: 8 }}
                                        onClick={() => handleDelete(product.id)}
                                    />
                                )}
                            </div>

                        </Card>
                    </Col>
                ))}
            </Row>
            <div>
                <Pagination
                    total={filteredProducts.length}
                    pageSize={pageSize}
                    current={currentPage}
                    onChange={(page, pageSize) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

function ProductList() {
    return (
        <div className="Product">
            <ProductListConst />
        </div>
    );
}

export default ProductList;
