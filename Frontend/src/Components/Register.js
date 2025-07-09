import React, { useState } from 'react';
import './Auth.css'; // Reuse the same CSS for styling

const RegisterPage = () => {
    const [isUserRegister, setIsUserRegister] = useState(true); // Toggle between user and company registration
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        skill: '',
        dob: '',
        address: '',
        phoneno: '',
        city: '',
        state: '',
        country: '',
        linkedin: '', // Add LinkedIn to the form data
        ceo: '',
        type: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const url = isUserRegister ? 'http://localhost:8080/jobPortal/user/register' : 'http://localhost:8080/jobPortal/company/register';

        const data = isUserRegister
            ? {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                skill: formData.skill,
                dob: formData.dob,
                address: formData.address,
                phoneno: formData.phoneno,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                linkedin: formData.linkedin, // Include LinkedIn in user registration data
            }
            : {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                ceo: formData.ceo,
                type: formData.type,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                phoneno: formData.phoneno,
            };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            if (result.success) {
                alert(`${isUserRegister ? 'User' : 'Company'} registered successfully!`);
                // Redirect to login page or dashboard
            } else {
                alert(`Error: ${result.message}`);
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred during registration.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="auth-page-container">
            <header className="header">
                <div className="nav-container">
                    <div className="nav-links">
                        <a href="/" className="nav-link">Home</a>
                        <a href="/search" className="nav-link">Search</a>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <h1 className="title">{isUserRegister ? 'User Registration' : 'Company Registration'}</h1>

                <button
                    className="toggle-button"
                    onClick={() => setIsUserRegister(!isUserRegister)}
                >
                    Switch to {isUserRegister ? 'Company Registration' : 'User Registration'}
                </button>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password:</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* User-Specific Fields */}
                    {isUserRegister && (
                        <>
                            <div className="form-group">
                                <label>Skill:</label>
                                <input
                                    type="text"
                                    name="skill"
                                    value={formData.skill}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth:</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>LinkedIn:</label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    placeholder="https://www.linkedin.com/in/your-profile"
                                />
                            </div>
                        </>
                    )}

                    {/* Company-Specific Fields */}
                    {!isUserRegister && (
                        <>
                            <div className="form-group">
                                <label>CEO:</label>
                                <input
                                    type="text"
                                    name="ceo"
                                    value={formData.ceo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Company Type:</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    <div className="form-group">
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone No:</label>
                        <input
                            type="text"
                            name="phoneno"
                            value={formData.phoneno}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>State:</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Country:</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Register
                    </button>
                </form>

                <p className="auth-link">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </main>
        </div>
    );
};

export default RegisterPage;
