import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyProfile.css';

const CompanyProfile = () => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            const companyData = JSON.parse(localStorage.getItem("companyData"));

            if (!companyData || !companyData._id) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(`http://localhost:8080/jobPortal/company/${companyData._id}/profile`);

                if (!response.ok) {
                    throw new Error('Failed to fetch company details');
                }

                const data = await response.json();
                console.log("Company API Response:", data); // Debugging Log

                if (data.success && data.company) {
                    setCompany(data.company);
                } else {
                    throw new Error(data.message || 'Company data is missing');
                }
            } catch (err) {
                setError(err.message);
                console.error('Error fetching company details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("companyData");
        navigate('/login');
    };

    return (
        <div className="profile-page-container">
            <header className="header">
                <div className="nav-container">
                    <div className="nav-links">
                        <a href="/company" className="nav-link">Job Add</a>
                        <a href="/search" className="nav-link">Search</a>
                        <button onClick={handleLogout} className="logout-button">Logout</button>
                    </div>
                </div>
            </header>

            {loading && <div className="loading-spinner">Loading...</div>}
            {error && <div className="error-message">Error: {error}</div>}

            {company && (
                <main className="main-content">
                    <section className="company-header">
                        <h1 className="title">{company.name || "Company Name Not Available"}</h1>
                    </section>

                    <section className="profile-details">
                        <div className="detail-section">
                            <h2>Company Information</h2>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <span className="detail-label">Company Name:</span>
                                    <span className="detail-value">{company.name || 'N/A'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Company Type:</span>
                                    <span className="detail-value">{company.type || 'N/A'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">CEO:</span>
                                    <span className="detail-value">{company.ceo || 'N/A'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Skills:</span>
                                    <span className="detail-value">
                                        {company.skills?.length ? company.skills.join(", ") : "No skills provided"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="detail-section">
                            <h2>Contact Information</h2>
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <span className="detail-label">Email:</span>
                                    <span className="detail-value">{company.email || 'N/A'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">Address:</span>
                                    <span className="detail-value">{company.address || 'N/A'}</span>
                                </div>
                                <div className="detail-item">
                                    <span className="detail-label">City:</span>
                                    <span className="detail-value">{company.city || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="posted-jobs">
                        <h2>Posted Jobs ({company.jobs?.length || 0})</h2>
                        <div className="jobs-list">
                            {company.jobs?.length > 0 ? (
                                company.jobs.map((job) => (
                                    <div key={job._id} className="job-card">
                                        <h3>{job.name}</h3>
                                        <p>{job.description}</p>
                                        <div className="job-details">
                                            <span>Location: {job.place}</span>
                                            <span>Salary: ${job.salary}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No jobs posted yet.</p>
                            )}
                        </div>
                    </section>
                </main>
            )}
        </div>
    );
};

export default CompanyProfile;
