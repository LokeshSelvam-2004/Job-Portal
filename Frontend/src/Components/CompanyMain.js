import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompanyMain.css";

const CompanyMain = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        place: "",
        salary: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.name || !formData.description || !formData.place || !formData.salary) {
            setError("Please fill all the fields.");
            return;
        }

        const companyData = JSON.parse(localStorage.getItem("companyData"));
        if (!companyData) {
            setError("Company not logged in. Please log in again.");
            navigate("/login");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`http://localhost:8080/jobPortal/company/${companyData._id}/addJobs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add job');
            }

            const result = await response.json();
            alert("Job added successfully!");
            setFormData({
                name: "",
                description: "",
                place: "",
                salary: "",
            });

        } catch (error) {
            setError(error.message || "An error occurred while adding the job.");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem("companyData");
        navigate("/login");
    };

    return (
        <div className="container">
            <nav className="navbar">
                <div className="nav-left">
                    <h2>Add Jobs</h2>
                </div>
                <div className="nav-right">
                    <a href="/" className="nav-item">Home</a>
                    <a href="/companyprofile" className="nav-item">Profile</a>
                    <button className="logout-button" onClick={logout}>Logout</button>
                </div>
            </nav>

            <main className="main-content">
                <h1 className="title">Post a Job</h1>

                {error && (
                    <div className="error-message" style={{ color: 'red', margin: '10px 0' }}>
                        {error}
                    </div>
                )}

                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Job Title</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter job title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter job description"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="place">Location</label>
                            <input
                                type="text"
                                id="place"
                                name="place"
                                value={formData.place}
                                onChange={handleChange}
                                placeholder="Enter job location"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="salary">Salary</label>
                            <input
                                type="number"
                                id="salary"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="Enter salary in USD"
                                required
                            />
                        </div>

                        <div className="button-container">
                            <button
                                type="submit"
                                disabled={loading}
                                className={loading ? "loading" : ""}
                            >
                                {loading ? "Adding..." : "Add Job"}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default CompanyMain;
