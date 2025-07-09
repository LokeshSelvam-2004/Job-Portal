import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [loginType, setLoginType] = useState("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let url;
        if (loginType === "company") {
            url = "http://localhost:8080/jobPortal/company/login";
        } else if (loginType === "admin") {
            url = "http://localhost:8080/jobPortal/admin/login";
        } else {
            url = "http://localhost:8080/jobPortal/user/login";
        }

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();
            console.log("Login Response:", result);

            if (!response.ok) {
                throw new Error(result.message || "Login failed");
            }

            localStorage.setItem("token", result.token);
            localStorage.setItem("userRole", JSON.stringify(loginType)); // Store role

            if (loginType === "company" && result.company) {
                localStorage.setItem("companyData", JSON.stringify(result.company));
                navigate("/company");
            } else if (loginType === "admin" && result.admin) {
                localStorage.setItem("userData", JSON.stringify(result.admin));
                navigate("/admin");
            } else if (result.user) {
                localStorage.setItem("userData", JSON.stringify(result.user));
                navigate("/");
            } else {
                throw new Error("Invalid login response structure");
            }

            alert("Login successful!");
        } catch (error) {
            console.error("Login error:", error.message);
            alert(error.message);
        }
    };

    const toggleLoginType = () => {
        setLoginType((prev) =>
            prev === "user" ? "company" : prev === "company" ? "admin" : "user"
        );
        setEmail("");
        setPassword("");
    };

    return (
        <div className="auth-page-container">
            <header className="header">
                <div className="nav-container">
                    <div className="nav-links">
                        <a href="/" className="nav-link">Home</a>
                        <a href="/search" className="nav-link">Search</a>
                        <a href="/profile" className="nav-link">Profile</a>
                    </div>
                </div>
            </header>

            <main className="main-content">
                <h1 className="title">Login</h1>

                <div className="toggle-container">
                    <button className="toggle-button" onClick={toggleLoginType}>
                        Switch to {loginType === "user" ? "Company" : loginType === "company" ? "Admin" : "User"} Login
                    </button>
                    <p className="current-login">
                        <strong>{loginType.charAt(0).toUpperCase() + loginType.slice(1)} Login</strong>
                    </p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        Login
                    </button>
                    <p className="auth-link">
                        If you don't have an account? <a href="/register">Register</a>
                    </p>
                </form>
            </main>
        </div>
    );
};

export default LoginPage;
