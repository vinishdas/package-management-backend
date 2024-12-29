const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

// Initialize app and environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON requests
app.use(express.static('public')); // Serve static files (uploaded images)

// Set up multer for image file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Save images in 'public/images' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Set unique filename based on timestamp
  },
});

const upload = multer({ storage: storage });

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('Connected to the MySQL database.');
});

// User Login Endpoint
app.post('/api/login', (req, res) => {
  const { name, password } = req.body;

  const query = 'SELECT role FROM users WHERE name = ? AND password = ?';
  db.query(query, [name, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      const userRole = results[0].role; // "student" or "receptionist"
      res.status(200).json({ message: 'Login successful', role: userRole });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// Add Package Endpoint with Image Upload
app.post('/api/packages', upload.single('image'), (req, res) => {
  const { name, phone, dateDelivered } = req.body;
  const image = req.file ? `/images/${req.file.filename}` : null; // Save file path if an image is uploaded

  // Check if the user exists in the `users` table
  const checkQuery = 'SELECT * FROM users WHERE name = ? AND phone = ?';
  db.query(checkQuery, [name, phone], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      // If the user exists, insert the package into the `packages` table
      const insertQuery = 'INSERT INTO packages (name, phone, dateDelivered, image) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [name, phone, dateDelivered, image], (insertErr) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ error: 'Insert error' });
        }
        res.status(200).json({ message: 'Package added successfully.' });
      });
    } else {
      // If the user doesn't exist, insert into the `unknown_packages` table
      const unknownQuery = 'INSERT INTO unknown_packages (name, phone, dateDelivered, image) VALUES (?, ?, ?, ?)';
      db.query(unknownQuery, [name, phone, dateDelivered, image], (unknownErr) => {
        if (unknownErr) {
          console.error(unknownErr);
          return res.status(500).json({ error: 'Insert error' });
        }
        res.status(200).json({ message: 'Package added to unknown packages.' });
      });
    }
  });
});

// Fetch All Packages Endpoint
app.get('/api/all-packages', (req, res) => {
  const query = 'SELECT * FROM packages';  // Fetching all packages from the `packages` table
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch packages' });
    }
    res.status(200).json(results);  // Send the list of packages to the frontend
  });
});

// Fetch Packages for a Specific Student Endpoint
app.get('/api/packages/:studentName', (req, res) => {
  const studentName = req.params.studentName; // Get student name from URL parameter

  // Query the database for packages associated with the student's name
  const query = 'SELECT * FROM packages WHERE name = ?'; // Adjust the column name if needed
  db.query(query, [studentName], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch packages for student' });
    }

    if (results.length > 0) {
      res.status(200).json(results); // Send the list of packages as the response
    } else {
      res.status(404).json({ message: 'No packages found for this student' });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
