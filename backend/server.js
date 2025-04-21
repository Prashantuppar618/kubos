const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
    "mongodb+srv://prashant:pappu@cluster0.hji1nrv.mongodb.net/eventAppDB?retryWrites=true&w=majority&appName=Cluster0",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Error: ", err));

// User Schema & Model
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
});
const User = mongoose.model("User", userSchema);

// Routes

// Sign Up
app.post("/api/auth/signup", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashed });
        await user.save();
        res.json({ message: "Signup successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login
app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        res.json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Server Listen
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
