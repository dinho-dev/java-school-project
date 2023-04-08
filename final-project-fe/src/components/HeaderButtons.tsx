import LogoutButton from "./LogoutButton";
import {Button} from "antd";
import {Link} from "react-router-dom";
import React from "react";

const HeaderButtons = () => {
    const token = localStorage.getItem('token');

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '-50px', marginRight: '24px' }}>
            {token ? <LogoutButton /> : (
                <>
                    <Button type="primary">
                        <Link to="/login">Login</Link>
                    </Button>
                    <Button type="primary" style={{ marginLeft: '10px' }}>
                        <Link to="/register">Register</Link>
                    </Button>
                </>
            )}
        </div>
    );
};

export default HeaderButtons;