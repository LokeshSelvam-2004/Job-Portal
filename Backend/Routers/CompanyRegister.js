const express = require('express');
const router = express.Router();
const Company = require('../Models/CompanySchema');
const bcrypt = require('bcrypt');
const Jobs = require('../Models/JobSchema'); 

// Company Registration
router.post('/register', async (req, res) => {
    try {
       
        const existingCompany = await Company.findOne({ email: req.body.email });
        if (existingCompany) {
            return res.status(400).json({ success: false, message: 'Company with this email already exists' });
        }

        const company = new Company({
            name: req.body.name,
            email: req.body.email,
            ceo: req.body.ceo,
            type: req.body.type,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            phoneno: req.body.phoneno,
            passwordHash: await bcrypt.hash(req.body.password, 10), 
        });

        const savedCompany = await company.save();
        res.status(201).json({ success: true, message: 'Company registered successfully', company: savedCompany });
    } catch (err) {
        console.error('Error registering company:', err);
        res.status(500).json({ success: false, message: 'Error registering company', error: err.message });
    }
});

// Login Company
router.post('/login', async (req, res) => {
    const company = await Company.findOne({ email: req.body.email });
    
    if (!company) {
        return res.status(404).json({ success: false, message: "Email does not exist" });
    }

    if (bcrypt.compareSync(req.body.password, company.passwordHash)) {
        res.status(200).json({
            success: true,
            token: "some-jwt-token",
            company: { email: company.email, _id: company._id } 
        });
    } else {
        res.status(400).json({ success: false, message: "Password Incorrect" });
    }
});

router.post('/:companyId/addJobs', async (req, res) => {
    const { name, description, place, salary } = req.body;
    const companyId = req.params.companyId;

    try {
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }

        const job = new Jobs({
            name,
            description,
            place,
            salary,
            company: companyId
        });

        await job.save();
        company.jobs.push(job._id);
        await company.save();

        res.status(201).json({ success: true, message: "Job added successfully", job });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding job", error: error.message });
    }
});

// Fetch Company Details by ID (Without Authentication)
router.get('/:companyId/profile', async (req, res) => {
    const companyId = req.params.companyId;

    try {
        const company = await Company.findById(companyId).populate('jobs'); 

        if (!company) {
            return res.status(404).json({ success: false, message: 'Company not found' });
        }

        res.status(200).json({ success: true, company });
    } catch (err) {
        console.error('Error fetching company details:', err);
        res.status(500).json({ success: false, message: 'Error fetching company details', error: err.message });
    }
});

module.exports = router;