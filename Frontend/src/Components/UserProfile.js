import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if (!userData) {
            navigate('/login');
        } else {
            setUser(userData);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate('/login');
    };

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="profile-container">
            <header className="profile-nav">
                <div className="nav-links">
                    <a href="/" className="nav-link">Home</a>
                    <a href="/search" className="nav-link">Search</a>
                </div>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </header>

            <main className="profile-card">
                <div className="profile-image">
                    <div className="image-placeholder"></div>
                </div>
                <div className="profile-header">
                    <h1 className="profile-name">{user.name || "User"}</h1>
                    <p className="profile-title">{user.skill || "No skills provided"}</p>
                    <p className="profile-location">{user.city}, {user.state}, {user.country}</p>
                </div>

                <div className="profile-details">
                    {user.email && <div className="detail-row"><span className="detail-label">Email:</span><span className="detail-value">{user.email}</span></div>}
                    {user.dob && <div className="detail-row"><span className="detail-label">Date of Birth:</span><span className="detail-value">{user.dob}</span></div>}
                    {user.address && <div className="detail-row"><span className="detail-label">Address:</span><span className="detail-value">{user.address}</span></div>}
                    {user.phoneno && <div className="detail-row"><span className="detail-label">Phone No:</span><span className="detail-value">{user.phoneno}</span></div>}
                    {user.linkedin && <div className="detail-row"><span className="detail-label">LinkedIn:</span><span className="detail-value"><a href={user.linkedin} target="_blank" rel="noopener noreferrer">{user.linkedin}</a></span></div>}
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
