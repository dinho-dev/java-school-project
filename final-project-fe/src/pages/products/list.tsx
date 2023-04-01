import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';

interface Product {
    id: string;
    categoryId: number;
    name: string;
    price: number;
    parameters: string;
    weight: string;
    volume: string;
    quantityInStock: number;
    imageUrl: string;
}

const ProductListConst = () => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/v1/products')
            .then((response) => {
                const data = response.data;
                setProducts(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Container fluid="md">
            <Row xs={1} sm={2} md={3} className="g-4">
                {products.map((product) => (
                    <Col key={product.id}>
                        <Card>
                            <Link
                                to={`http://localhost:8080/api/v1/products/${product.id}`}
                            >
                                <CardImg
                                    src={product.imageUrl}
                                    alt={product.name}
                                    variant="top"
                                    height="200"
                                    width="auto"
                                    style={{ objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                                        <span className="fs-2">{product.name}</span>
                                        <span className="text-muted">${product.price}</span>
                                    </Card.Title>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
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
