import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // Import your CSS file

const Login = () => {
    const [formData, setFormData] = useState({
        password: "",
        email: "",
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const SignIn = async () => {
        console.log("Login Function Executed", formData);
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Login failed:', errorData);
                return;
            }

            const responseData = await response.json();
            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace('/');
            } else {
                console.error('Login failed:', responseData.errors);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-box'>
                <div className='login-title'>Login</div>
                <input 
                    name='email' 
                    value={formData.email} 
                    onChange={changeHandler} 
                    type="email" 
                    placeholder='Email address' 
                    className='login-input' 
                />
                <input 
                    name='password' 
                    value={formData.password} 
                    onChange={changeHandler} 
                    type="password" 
                    placeholder='Password' 
                    className='login-input' 
                />
                <button 
                    type='submit' 
                    onClick={SignIn} 
                    className='login-button'>
                    Continue
                </button>
                <div>
                    Create an account? <Link to="/signup" className='signup-link'>Click here</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
