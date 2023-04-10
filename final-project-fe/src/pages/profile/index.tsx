import React, { FC } from 'react';
import { Card, Button } from 'antd';
import EditProfileForm from "./edit";
import Address from "./address";
import { useParams } from 'react-router-dom';
export function Profile() {
    return (
        <div>
            <Card
                title="Profile"
            >
                <EditProfileForm/>
            </Card>
            <Card title="Address">
                <Address/>
            </Card>
        </div>
    );
}

