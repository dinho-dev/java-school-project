import { useState, useEffect } from "react";
import { Table } from "antd";
import axios from "axios";

const columns = [
    {
        title: "Product Title",
        dataIndex: "title",
        key: "title",
    },
    {
        title: "Total Quantity",
        dataIndex: "totalQuantity",
        key: "totalQuantity",
    },
];

function SalesStatistics() {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/v1/sales/top-products", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return <Table columns={columns} dataSource={data} />;
}

export default SalesStatistics;
