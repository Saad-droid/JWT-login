import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post('http://localhost:4000/token', {
        token: refreshToken,
      });

      const newAccessToken = response.data.accessToken;

      // Update the stored access token
      localStorage.setItem('accessToken', newAccessToken);

      console.log('Access token refreshed successfully');
    } catch (error) {
      console.error('Failed to refresh access token', error.message, error.response?.data);
    }
  };

  // Function to check if the access token is expired
  const isAccessTokenExpired = () => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return true; // No token available, consider it expired
    }

    // Decode the JWT token to get expiration time
    const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
    console.log(decodedToken);
    const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds

    // Check if the token is expired
    return expirationTime < Date.now();
  };

  // useEffect to periodically check and refresh the token
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (isAccessTokenExpired()) {
        await refreshAccessToken();
      }
    };

    // Check and refresh token every 15 seconds (adjust as needed)
    const intervalId = setInterval(checkAndRefreshToken, 15 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4000/login', {
        username,
        password,
      }, {
        withCredentials: true, // Include credentials in the request
      });
  
      const { accessToken, refreshToken, user } = response.data;
  
      // Store tokens in localStorage or a secure storage solution
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      const user1 = JSON.parse(localStorage.getItem('user'));

      if (user1) {
        console.log(`Welcome, ${user.username}!`);
      }
  
      console.log('Login successful');
      navigate('/success');
    } catch (error) {
      console.error('Login failed', error.message, error.response?.data);
      navigate('/failed');
    }
  };
  

  return (
    <div>
    <h1>Login</h1>
    <label>
      Username:
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
    </label>
    <br />
    <label>
      Password:
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </label>
    <br />
    <button onClick={handleLogin}>Login</button>
   
  </div>
  );
};

export default Login;
