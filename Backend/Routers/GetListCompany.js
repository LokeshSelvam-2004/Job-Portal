const express = require('express');
const router = express.Router();
const Company = require('../Models/CompanySchema');

// Get List of Companies
router.get('/', async (req, res) => {
    try {
        console.log("Fetching company list...");
        const list = await Company.find().select('name jobs').populate('jobs', '-_id');

        if (!list || list.length === 0) {
            return res.status(404).json({ success: false, message: "No companies found" });
        }

        return res.status(200).json(list);
    } catch (error) {
        console.error("Error fetching companies:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// Search Job Details
router.get("/search", async (req, res) => {
    try {
        const searchQuery = req.query.search?.trim().toLowerCase().replace(/\n/g, '') || "";
        console.log("Search Query:", searchQuery);

        const isNumber = !isNaN(Number(searchQuery));

        const results = await Company.aggregate([
            {
                $lookup: {
                    from: "jobs",       
                    localField: "jobs",
                    foreignField: "_id",
                    as: "jobDetails"
                }
            },
            {
                $match: {
                    $or: [
                        { name: { $regex: searchQuery, $options: "i" } },
                        { "jobDetails.name": { $regex: searchQuery, $options: "i" } },
                        { "jobDetails.place": { $regex: searchQuery, $options: "i" } },
                        ...(isNumber ? [{ "jobDetails.salary": searchQuery }] : [])
                    ]
                }
            },
            {
                $project: {
                    name: 1,
                    "jobDetails.name": 1,
                    "jobDetails.place": 1,
                    "jobDetails.salary": 1
                }
            }
        ]);

        if (results.length === 0) {
            return res.status(404).json({ success: false, message: "No matching jobs found" });
        }

        console.log("Search Results:", JSON.stringify(results, null, 2));
        return res.status(200).json(results);
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
