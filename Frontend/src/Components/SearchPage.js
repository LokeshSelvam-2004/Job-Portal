import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SearchPage.css';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePage, setProfilePage] = useState("/profile");
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is logged in (just for navigation display)
        const token = localStorage.getItem("token");
        const userRole = JSON.parse(localStorage.getItem("userRole"));

        if (token) {
            setIsLoggedIn(true);
            setProfilePage(userRole === "company" ? "/companyprofile" : "/profile");
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8080/jobPortal/home/search?search=${searchQuery}`);
            if (!response.ok) {
                throw new Error("Failed to fetch job data");
            }
            const data = await response.json();
            setJobs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            fetchJobs();
        }
    }, [searchQuery]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userData");
        localStorage.removeItem("companyData");
        setIsLoggedIn(false);
        navigate("/login");
        window.dispatchEvent(new Event("storage"));
    };

    return (
        <div className="job-page-container">
            <header className="header">
                <nav className="nav-container">
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/search" className="nav-link">Search</Link>
                        {isLoggedIn && (
                            <Link to={profilePage} className="nav-link">Profile</Link>
                        )}
                        {!isLoggedIn ? (
                            <Link to="/login" className="nav-link">Login</Link>
                        ) : (
                            <button onClick={handleLogout} className="nav-link logout-button">Logout</button>
                        )}
                    </div>
                </nav>
            </header>

            <div className="main-content">
                <h1 className="title">Search for Jobs</h1>

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search job by name, location, or salary..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button onClick={fetchJobs} className="search-button">Search</button>
                </div>

                {loading && <p className="loading-text">Loading jobs...</p>}
                {error && <p className="error-text">{error}</p>}

                <div className="job-cards-container">
                    {jobs.length > 0 ? (
                        jobs.map((company, index) => (
                            <div key={index} className="job-card">
                                <h2 className="company-name">{company.name}</h2>
                                {company.jobDetails && company.jobDetails.length > 0 ? (
                                    company.jobDetails.map((job, jobIndex) => (
                                        <div key={jobIndex}>
                                            <h3 className="job-vacancy">{job.name}</h3>
                                            <p className="location"><strong>Location:</strong> {job.place}</p>
                                            <p className="salary"><strong>Salary:</strong> {job.salary}</p>
                                            <button
                                                className="apply-button"
                                                onClick={() => {
                                                    if (!isLoggedIn) {
                                                        navigate('/login');
                                                    } else {
                                                        // Handle apply logic for logged-in users
                                                        alert('Application submitted!');
                                                    }
                                                }}
                                            >
                                                Apply Now
                                            </button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="no-jobs">No jobs available</p>
                                )}
                            </div>
                        ))
                    ) : (
                        searchQuery ? <p className="no-jobs">No jobs found</p> : <p className="instruction-text">Enter a search term to find jobs</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;