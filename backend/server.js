const Project = require("./models/Project");
const Skill = require("./models/Skill");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Student = require("./models/Student");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/campusconnect")
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.send("CampusConnect Backend is Running!");
});


app.get("/api/skills/:studentId", async (req, res) => {
  try {
    const skills = await Skill.find({
      studentId: req.params.studentId
    });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch skills." });
  }
});

app.post("/api/skills", async (req, res) => {
  try {
    const { studentId, name } = req.body;

    if (!studentId || !name || !name.trim()) {
      return res.status(400).json({
        message: "Student ID and skill name are required."
      });
    }

    const skill = await Skill.create({
      studentId,
      name: name.trim()
    });

    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: "Could not save skill." });
  }
});

app.delete("/api/skills/:id", async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found." });
    }

    res.json({ message: "Skill deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete skill." });
  }
});

// Student registration API
app.post("/api/students/register", async (req, res) => {
  try {
    const { fullName, email, branch, password } = req.body;

    if (!fullName || !email || !branch || !password) {
      return res.status(400).json({
        message: "Please fill in all fields."
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters."
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingStudent = await Student.findOne({
      email: normalizedEmail
    });

    if (existingStudent) {
      return res.status(409).json({
        message: "This email is already registered."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({
      fullName: fullName.trim(),
      email: normalizedEmail,
      branch,
      password: hashedPassword
    });

    await student.save();

    res.status(201).json({
      message: "Student registered successfully!",
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        branch: student.branch
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "This email is already registered."
      });
    }

    console.error("Registration error:", error.message);

    res.status(500).json({
      message: "Registration failed. Please try again."
    });
  }
});

// Student Login API
app.post("/api/students/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password."
      });
    }

    const student = await Student.findOne({
      email: email.trim().toLowerCase()
    });

    if (!student) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      student.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    res.json({
      message: "Login successful!",
      student: {
        id: student._id,
        fullName: student.fullName,
        email: student.email,
        branch: student.branch
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);

    res.status(500).json({
      message: "Login failed. Please try again."
    });
  }
});


app.get("/api/projects/:studentId", async (req, res) => {
  try {
    const projects = await Project.find({
      studentId: req.params.studentId
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch projects." });
  }
});

app.post("/api/projects", async (req, res) => {
  try {
    const { studentId, title, description } = req.body;

    if (!studentId || !title || !title.trim()) {
      return res.status(400).json({
        message: "Student ID and project title are required."
      });
    }

    const project = await Project.create({
      studentId,
      title: title.trim(),
      description: description || ""
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Could not save project." });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.json({ message: "Project deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Could not delete project." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});