const mongoose = require("mongoose");
const Admin = require("./Models/Admin"); // correct path

mongoose.connect("mongodb://localhost:27017/JobPortal")
  .then(async () => {
    const email = "lokesh@example.com";
    const password = "loki@1234";

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log("Admin already exists:", exists.email);
    } else {
      const admin = new Admin({ email, password });
      await admin.save();
      console.log("✅ Admin created:", email);
    }

    mongoose.disconnect();
  })
  .catch(err => console.error(err));
