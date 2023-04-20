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
            navigate('/products')
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    // log out when token expires
    const checkTokenExpiration = () => {
        const tokenExpiration = localStorage.getItem('tokenExpiration');
        if (tokenExpiration) {
            const currentTime = new Date().getTime();
            const expirationTime = new Date(tokenExpiration).getTime();
            if (currentTime > expirationTime) {
                handleLogout();
            }
        }
    };
    // Check token expiration every 5 minutes

    setInterval(checkTokenExpiration, 300000);
    return (
        <Button type="primary" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;
