import React, { FC } from 'react';
import { Card, Button } from 'antd';

import { useParams } from 'react-router-dom';
import Address from "../profile/address";
import CategoryList from "./categories";
import Orders from "./orders";

export function Dashboard() {
    return (
        <div>
            <Card
                title="Categories"
            >
                <CategoryList/>
            </Card>
            <Card
                title="Orders"
            >
                <Orders/>
            </Card>
        </div>
    );
}

