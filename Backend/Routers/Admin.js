    const express=require('express');
    const router=express.Router();
    const Company=require('../Models/CompanySchema');
    const User=require('../Models/UserSchema')
    const Job = require('../Models/JobSchema');
    const Admin=require('../Models/Admin')

    //getuserlist
    router.get('/userlist', async (req, res) => {
        try {
            const listUser = await User.find(); 
            if (!listUser || listUser.length === 0) {
                return res.status(404).send({ success: false, message: "User List Not Found" });
            }
            res.status(200).json(listUser); 
        } catch (err) {
            res.status(500).send({ success: false, message: err.message }); 
        }
    });

    //getListOf Companies
    router.get('/companylist', async (req, res) => {
        console.log("kk");
        const list = await Company.find().select('name jobs').populate('jobs', '-_id');

        if (!list) {
            res.status(500).json({ success: false, message: "not found" });
        }
        res.status(200).send(list);
    });

    // Get User Count
    router.get('/user-count', async (req, res) => {
        try {
            const userCount = await User.countDocuments();  
            res.status(200).json({ userCount });
        } catch (err) {
            res.status(400).send({ message: 'Error fetching user count', error: err });
        }
    });

    // Get Company Count
    router.get('/company-count', async (req, res) => {
        try {
            const companyCount = await Company.countDocuments(); 
            res.status(200).json({ companyCount });
        } catch (err) {
            res.status(400).send({ message: 'Error fetching company count', error: err });
        }
    });




    // Get Job Count
    router.get('/job-count', async (req, res) => {
        try {
            const totalJobs = await Job.countDocuments();
            res.status(200).json({ jobCount: totalJobs });
        } catch (err) {
            console.error("Error fetching job count:", err);
            res.status(400).json({ message: 'Error fetching job count', error: err.message });
        }
    });



    // Delete User
    router.delete('/user/:id', async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await User.findByIdAndDelete(userId); 

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ success: false, message: 'Error deleting user', error: err.message });
        }
    });

    // Delete Company
    router.delete('/company/:id', async (req, res) => {
        try {
            const companyId = req.params.id;
            const company = await Company.findByIdAndDelete(companyId); 

            if (!company) {
                return res.status(404).json({ success: false, message: 'Company not found' });
            }

            res.status(200).json({ success: true, message: 'Company deleted successfully' });
        } catch (err) {
            console.error('Error deleting company:', err);
            res.status(500).json({ success: false, message: 'Error deleting company', error: err.message });
        }
    });

    // Delete Job
    router.delete('/users/:id', async (req, res) => {
        try {
            const userId = req.params.id;
            console.log('Attempting to delete user with ID:', userId); // Debugging line

            const user = await User.findByIdAndDelete(userId);

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            res.status(200).json({ success: true, message: 'User deleted successfully' });
        } catch (err) {
            console.error('Error deleting user:', err);
            res.status(500).json({ success: false, message: 'Error deleting user', error: err.message });
        }
    });

    router.delete('/companies/:id', async (req, res) => {
        try {
            const companyId = req.params.id;
            console.log('Attempting to delete company with ID:', companyId);

            const company = await Company.findByIdAndDelete(companyId);

            if (!company) {
                return res.status(404).json({ success: false, message: 'Company not found' });
            }

            res.status(200).json({ success: true, message: 'Company deleted successfully' });
        } catch (err) {
            console.error('Error deleting company:', err);
            res.status(500).json({ success: false, message: 'Error deleting company', error: err.message });
        }
    });
    //jobid
    router.delete('/jobs/:id', async (req, res) => {
        try {
            const jobid = req.params.id;
            console.log('Attempting to delete job with ID:', jobid);

            const job = await Job.findByIdAndDelete(jobid);

            if (!job) {
                return res.status(404).json({ success: false, message: 'job not found' });
            }

            res.status(200).json({ success: true, message: 'job deleted successfully' });
        } catch (err) {
            console.error('Error deleting job:', err);
            res.status(500).json({ success: false, message: 'Error deleting job', error: err.message });
        }
    });



    // Fetching job list from the backend
    router.get('/joblist', async (req, res) => {
        try {
            const jobs = await Job.find(); 
            res.status(200).json(jobs);
        } catch (err) {
            res.status(500).json({ success: false, message: "Error fetching jobs", error: err.message });
        }
    }); 
    router.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log("Login attempt for:", email);

            
            const admin = await Admin.findOne({ email });
            console.log("Query Result:", admin);

            if (!admin) {
                console.log("Admin not found in database for email:", email);
                return res.status(401).json({ message: "Admin not found" });
            }

            if (password !== admin.password) {
                console.log("Incorrect password for email:", email);
                return res.status(401).json({ message: "Invalid credentials" });
            }

            console.log("Login successful for:", email);
            res.json({ success: true, admin: { id: admin._id, email: admin.email } });
        } catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });

    module.exports=router;





