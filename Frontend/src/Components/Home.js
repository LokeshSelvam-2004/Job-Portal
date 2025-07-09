import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img3 from '../images/img3.png';
import  logo from '../images/logo.png';
const JobPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profilePage, setProfilePage] = useState("/profile");
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem("token");
            const userRole = JSON.parse(localStorage.getItem("userRole"));

            if (token) {
                setIsLoggedIn(true);
                setProfilePage(userRole === "company" ? "/companyprofile" : "/profile");
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();

        const handleStorageChange = () => {
            checkLoginStatus();
        };
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

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
                <div className="nav-container">
                    {/*<img className="logo"  src={logo}/>*/}
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
                </div>
            </header>

            <main className="main-content">
                <section className="zigzag-section">
                    <div className="text-container">
                        <h2>Motivation</h2>
                        <p>Motivation is the driving force behind achieving professional goals and excelling in a job.
                            It fuels an individual’s determination, creativity, and resilience, enabling them to overcome
                            challenges and stay committed to their tasks. A motivated employee is inspired to contribute positively, take initiative, and pursue continuous growth,
                            fostering both personal and organizational success</p>
                    </div>
                    <div className="image-container">
                        <img src={img1} alt="Motivation" />
                    </div>
                </section>

                <section className="zigzag-section">
                    <div className="image-container">
                        <img src={img2} alt="Job Description" />
                    </div>
                    <div className="text-container">
                        <h2>Unlock a World of Career Possibilities</h2>
                        <p>"Unlock a world of career possibilities with our detailed job descriptions.
                            Each role is carefully outlined to provide a clear understanding of responsibilities, qualifications, and skills required to excel. From outlining day-to-day tasks to highlighting growth opportunities, we aim to connect talent with the right roles. Start your journey toward a fulfilling career and discover where your skills
                            and passions can make a difference."</p>
                    </div>
                </section>

                <section className="zigzag-section">
                    <div className="text-container">
                        <h2>Join Leading Global Companies</h2>
                        <p>Join leading global companies that offer diverse job opportunities and a pathway to
                            success. Renowned organizations like Google, Amazon, Microsoft, Tata Consultancy Services, Accenture, and Deloitte are constantly seeking talented individuals to drive innovation and growth. These companies provide not only competitive salaries but also exceptional benefits, learning opportunities, and inclusive work environments. Explore roles across industries like technology, healthcare, finance, and more to find
                            the perfect fit for your career aspirations</p>
                    </div>
                    <div className="image-container">
                        <img src={img3} alt="Global Companies" />
                    </div>
                </section>
            </main>

            <footer className="footer">
                <p className="footer-text">Copyright © 2023</p>
            </footer>
        </div>
    );
};

export default JobPage;