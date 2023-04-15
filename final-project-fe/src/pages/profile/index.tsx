import React, { FC } from 'react';
import { Card, Button } from 'antd';
import EditProfileForm from "./edit";
import Address from "./address";
import UserOrders from "./orders";
export function Profile({address, setAddress}) {
    return (
        <div>
            <Card
                title="Profile"
            >
                <EditProfileForm/>
            </Card>
            <Card title="Address">
                <Address address={address} setAddress={setAddress}/>
            </Card>
            <Card title="Orders">
                <UserOrders/>
            </Card>
        </div>
    );
}

