import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './signup.css'; // Import your CSS file

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: ""
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const SignUp = async () => {
        console.log("SignUp Function Executed", formData);
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Signup failed:', errorData);
                return;
            }

            const responseData = await response.json();
            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace('/');
            } else {
                console.error('Signup failed:', responseData.errors);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    return (
        <div className='signup-container'>
            <div className='signup-box'>
                <div className='signup-title'>Sign Up</div>
                <input 
                    name='username' 
                    value={formData.username} 
                    onChange={changeHandler} 
                    type="text" 
                    placeholder='Your Name' 
                    className='signup-input' 
                />
                <input 
                    name='email' 
                    value={formData.email} 
                    onChange={changeHandler} 
                    type="email" 
                    placeholder='Email address' 
                    className='signup-input' 
                />
                <input 
                    name='password' 
                    value={formData.password} 
                    onChange={changeHandler} 
                    type="password" 
                    placeholder='Password' 
                    className='signup-input' 
                />
                <button 
                    type='submit' 
                    onClick={SignUp} 
                    className='signup-button'>
                    Continue
                </button>
                <div>
                    Already have an account? <Link to="/login" className='login-link'>Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
