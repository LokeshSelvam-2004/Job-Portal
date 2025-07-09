import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import AdminMain from "./Components/AdminMain";
import Register from "./Components/Register";
import SearchPage from "./Components/SearchPage";
import UserProfile from "./Components/UserProfile";
import LoginPage from "./Components/LoginUser";
import Home from "./Components/Home";
import CompanyMain from "./Components/CompanyMain";
import CompanyProfile from "./Components/CompanyProfile";
import { useEffect, useState } from 'react';

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
    const token = localStorage.getItem('token');
    const userRole = JSON.parse(localStorage.getItem('userRole'));

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    return children;
};

function App() {
    return (
        <div className="App">
            <Routes>


                <Route path="/" element={<Home />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginPage />} />


                <Route path="/company" element={
                    <ProtectedRoute allowedRoles={['company']}>
                        <CompanyMain />
                    </ProtectedRoute>
                } />

                <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                        <AdminMain />
                    </ProtectedRoute>
                } />

                <Route path="/profile" element={
                    <ProtectedRoute allowedRoles={['user']}>
                        <UserProfile />
                    </ProtectedRoute>
                } />

                <Route path="/companyprofile" element={
                    <ProtectedRoute allowedRoles={['company']}>
                        <CompanyProfile />
                    </ProtectedRoute>
                } />
            </Routes>
        </div>
    );
}

export default App;