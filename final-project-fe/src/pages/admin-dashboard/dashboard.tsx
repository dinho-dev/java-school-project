import React, { FC } from 'react';
import { Card, Button } from 'antd';

import CategoryList from "./categories";
import Orders from "./orders";
import TopProducts from "./statistics";

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
            <Card
                title="Statistics"
            >
                <TopProducts/>
            </Card>
        </div>
    );
}

