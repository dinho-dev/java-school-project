import React, {ChangeEvent, useContext, useEffect, useState} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {Card, Button, Row, Col, Select, Slider, Input, message, Pagination, Badge, Modal, Form} from "antd";
import Image from "antd/es/image";
import {DeleteOutlined, EditOutlined, ShoppingCartOutlined} from "@ant-design/icons";
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
    quantity:number;
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
    const [selectedWeight, setSelectedWeight] = useState<string>("");
    const [isAscending, setIsAscending] = useState<boolean>(true);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [categories, setCategories] = useState<{ id: number; categoryName: string }[]>([]);

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
    // delete product
    const token = localStorage.getItem('token');
    const handleDelete = async (id: string) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this product?',
            onOk: async () => {
                await axios.delete(`http://localhost:8080/api/v1/products/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                message.warning("Product was deleted!");
                setProducts((prevProducts) =>
                    prevProducts.filter((product) => product.id !== id)
                );
            },
            onCancel: () => {},
        });
    };


    // get all categories for mapping in category filter
    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/categories')
            .then(response => {
                // set the categories in state
                setCategories(response.data); console.log(response.data)
            })
            .catch(error => {
                // handle error here
                console.error(error);
            });
    }, []); // run once on component mount

    function handleCategoryChange(value:number) {
        setSelectedCategory(value);
    }


    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(9);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const slicedProducts = filteredProducts.slice(startIndex, endIndex);



    //shopping cart implementation
    const [showCart, setShowCart] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
        if (existingItemIndex !== -1) {
            // If the product is already in the cart, update its quantity instead of adding a new item
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex] = {
                ...updatedCartItems[existingItemIndex],
                quantity: updatedCartItems[existingItemIndex].quantity + 1,
            };
            setCartItems(updatedCartItems);

        } else {
            // Otherwise, add the new item to the cart
            setCartItems(prevCartItems => [...prevCartItems, {...product, quantity: 1}]);
        }

        // Update the stored cart items in local storage
        localStorage.setItem("cartItems", JSON.stringify([...cartItems, {...product, quantity: 1}]));
    };

    const removeFromCart = (productId: string) => {
        const updatedCartItems = cartItems.filter((item) => item.id !== productId);
        setCartItems(updatedCartItems);

        // Update the stored cart items in local storage
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };
// todo fix bug if logged out or isle clicking remove doesnt remove

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
        setCartItems(storedCartItems);
    }, []);

   /* useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);*/

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);


    interface CartItemProps { // 3
        item: Product;
        removeFromCart: (productId: string) => void;
    }

    const CartItem: React.FC<CartItemProps> = ({ item, removeFromCart }) => {
        return (
            <Card className="cart-item">
                <div className="cart-item-image">
                    <img src={item.imageUrl} alt={item.title} style={{ maxWidth: '60px', marginRight: '16px' }} />
                </div>
                <div className="cart-item-details">
                    <p className="cart-item-name">{item.title}</p>
                    <p className="cart-item-price">{item.price}</p>
                    <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                    <Button type="primary" danger ghost className="remove-from-cart" onClick={() => removeFromCart(item.id)}>
                        Remove
                    </Button>
                </div>
            </Card>

        );
    };
    const handleCheckoutClick = () => {

        // добавить запрос на бэкэнд
       /* пост запрос на добаление ордера create order*/
        // Navigate to the checkout page
        navigate('/checkout');
    };
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };
    return (
        <div>
            <div>
                <Link to="/product/create">
                    {user.role === 'ADMIN' && (
                    <Button type="primary">Create</Button>
                    )}
                </Link>
                <div className="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px', padding: '0 20px' }}>
                    <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold'}}>My Shop</div>
                    <div className="cart" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                        <Badge count={totalQuantity}>
                            <ShoppingCartOutlined style={{fontSize:'50px'}} onClick={() => setShowCart(!showCart)} />
                        </Badge>
                    </div>
                </div>

                {showCart && (
                    <div className="cart">
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
                            ))}
                        </div>
                        <div className="cart-total">
                            <p>Total: ${getTotalPrice()}</p>
                            <Button type="primary" onClick={handleCheckoutClick}>Proceed to checkout</Button>
                        </div>
                    </div>
                )}
                <Select defaultValue={selectedCategory} onChange={handleCategoryChange} style={{ width: 120 }}>
                    <Option value={0}>All Categories</Option>
                    {categories.map(category => (
                        <Option key={category.id} value={category.id}>{category.categoryName}</Option>
                    ))}
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
                            hoverable={true}
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
                            <div style={{ marginTop: 16, display: 'flex', alignItems: 'center' }}>
                                <Link to={`/product/edit/${product.id}`}>
                                    {user.role === 'ADMIN' && <Button icon={<EditOutlined />} type="primary" />}
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
                                <div style={{ marginLeft: 'auto' }}>
                                    <Button onClick={() => addToCart(product)}>Add to Cart</Button>
                                </div>
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
