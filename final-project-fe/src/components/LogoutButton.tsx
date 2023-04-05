import { Button } from 'antd';
import axios from 'axios';

const LogoutButton = () => {
    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:8080/api/v1/auth/logout');
            localStorage.removeItem('token');
            window.location.reload(); // Refresh the page to update the UI
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
