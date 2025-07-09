import React, { useEffect, useState } from 'react';
import './AdminMain.css';

const AdminDashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [companyCount, setCompanyCount] = useState(0);
    const [jobCount, setJobCount] = useState(0);
    const [selectedList, setSelectedList] = useState(null);
    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [jobs, setJobs] = useState([]);

    const stats = [
        { title: 'User Count', count: userCount, type: 'users' },
        { title: 'Company Count', count: companyCount, type: 'companies' },
        { title: 'Jobs Count', count: jobCount, type: 'jobs' }
    ];

    useEffect(() => {
        // Fetch user count
        fetch('http://localhost:8080/jobPortal/admin/user-count')
            .then(response => response.json())
            .then(data => setUserCount(data.userCount))
            .catch(error => console.error('Error fetching user count:', error));

        // Fetch company count
        fetch('http://localhost:8080/jobPortal/admin/company-count')
            .then(response => response.json())
            .then(data => setCompanyCount(data.companyCount))
            .catch(error => console.error('Error fetching company count:', error));

        // Fetch job count
        fetch('http://localhost:8080/jobPortal/admin/job-count')
            .then(response => response.json())
            .then(data => setJobCount(data.jobCount))
            .catch(error => console.error('Error fetching job count:', error));
    }, []);

    const handleViewClick = async (type) => {
        setSelectedList(type);

        try {
            let response;
            if (type === 'users') {
                response = await fetch('http://localhost:8080/jobPortal/admin/userlist');
                const data = await response.json();
                setUsers(data);
            } else if (type === 'companies') {
                response = await fetch('http://localhost:8080/jobPortal/admin/companylist');
                const data = await response.json();
                setCompanies(data);
            } else if (type === 'jobs') {
                response = await fetch('http://localhost:8080/jobPortal/admin/joblist');
                const data = await response.json();
                setJobs(data);
            }
        } catch (error) {
            console.error(`Error fetching ${type} list:`, error);
        }
    };

    const handleDelete = async (id, type) => {
        try {
            await fetch(`http://localhost:8080/jobPortal/admin/${type}/${id}`, {
                method: 'DELETE',
            });

            if (type === 'users') {
                setUserCount(prevCount => prevCount - 1);
                setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
            } else if (type === 'companies') {
                setCompanyCount(prevCount => prevCount - 1);
                setCompanies(prevCompanies => prevCompanies.filter(company => company._id !== id));
            } else if (type === 'jobs') {
                setJobCount(prevCount => prevCount - 1);
                setJobs(prevJobs => prevJobs.filter(job => job._id !== id));
            }

        } catch (error) {
            console.error(`Error deleting ${type}:`, error);
        }
    };

    return (
        <div className="dashboard-container">
            {/* Header */}
            <header className="header">
                <div className="nav-container">
                    <div className="nav-links">
                        <a href="/admin" className="nav-link">Home</a>
                        <a href="/search" className="nav-link">Search</a>
                       
                        <a href="/login" className="nav-link logout-button">Logout</a>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="main-content">
                <h1 className="title">Admin Access</h1>

                <div className="stats-container">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <div className="stat-circle">
                                <p className="stat-title">{stat.title}</p>
                                <p className="stat-count">{stat.count}</p>
                            </div>
                            <button className="view-button" onClick={() => handleViewClick(stat.type)}>
                                View
                            </button>
                        </div>
                    ))}
                </div>


                {selectedList === 'users' && (
                    <div className="table-container">
                        <h2 className="details-title">User List</h2>
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td className="action-buttons">
                                        <button className="update-button">Update</button>
                                        <button className="delete-button" onClick={() => handleDelete(user._id, 'users')}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {selectedList === 'companies' && (
                    <div className="table-container">
                        <h2 className="details-title">Company List</h2>
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {companies.map(company => (
                                <tr key={company._id}>
                                    <td>{company.name}</td>
                                    <td>{company.email}</td>
                                    <td className="action-buttons">
                                        <button className="update-button">Update</button>
                                        <button className="delete-button" onClick={() => handleDelete(company._id, 'companies')}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {selectedList === 'jobs' && (
                    <div className="table-container">
                        <h2 className="details-title">Job List</h2>
                        <table className="data-table">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {jobs.map(job => (
                                <tr key={job._id}>
                                    <td>{job.name}</td>
                                    <td>{job.description}</td>
                                    <td className="action-buttons">
                                        <button className="update-button">Update</button>
                                        <button className="delete-button" onClick={() => handleDelete(job._id, 'jobs')}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;