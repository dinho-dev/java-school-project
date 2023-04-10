import { Button } from 'antd';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/auth/logout');
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            navigate('/product')
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button type="primary" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
