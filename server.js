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


// Fetch All Students (from student-table)
app.get('/api/admin/student-table', (req, res) => {
  const query = 'SELECT * FROM student_table';  // Fetch all data from the `student_table`
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch student data' });
    }
    res.status(200).json(results);  // Send the list of students to the frontend
  });
});

// Fetch All Teachers (from teacher-table)
app.get('/api/admin/teacher-table', (req, res) => {
  const query = 'SELECT * FROM teacher_table';  // Fetch all data from the `teacher_table`
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch teacher data' });
    }
    res.status(200).json(results);  // Send the list of teachers to the frontend
  });
});

// Fetch All Receptionists (from receptionist-table)
app.get('/api/admin/receptionist-table', (req, res) => {
  const query = 'SELECT * FROM receptionist_table';  // Fetch all data from the `receptionist_table`
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to fetch receptionist data' });
    }
    res.status(200).json(results);  // Send the list of receptionists to the frontend
  });
});



// Add a new student
app.post('/api/admin/student-table/add', (req, res) => {
  const { student_id, student_name, semester, year_joined, phone, password, role } = req.body;
  const query = 'INSERT INTO student_table (student_id, student_name, semester, year_joined, phone, password, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  db.query(query, [student_id, student_name, semester, year_joined, phone, password, role], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to add student' });
    }
    res.status(200).json({ message: 'Student added successfully' });
  });
});

// Add a new teacher
app.post('/api/admin/teacher-table/add', (req, res) => {
  const { teacher_id, teacher_name,year_joined,phone, password, role } = req.body;
  const query = 'INSERT INTO teacher_table (teacher_id, teacher_name,year_joined,phone, password, role) VALUES (?,?,?, ?, ?, ?)';
  
  db.query(query, [teacher_id, teacher_name,year_joined,phone, password, role], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to add teacher' });
    }
    res.status(200).json({ message: 'Teacher added successfully' });
  });
});

// Add a new receptionist
app.post('/api/admin/receptionist-table/add', (req, res) => {
  const { receptionist_id, receptionist_name,year_joined, receptionist_phone, password, role } = req.body;
  const query = 'INSERT INTO receptionist_table (receptionist_id, receptionist_name,year_joined,receptionist_phone, password, role) VALUES (?, ?, ?, ?, ?,?)';
  
  db.query(query, [receptionist_id, receptionist_name,year_joined,  receptionist_phone, password, role], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to add receptionist' });
    }
    res.status(200).json({ message: 'Receptionist added successfully' });
  });
});

// Delete a student record by ID
app.delete('/api/admin/student-table/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM student_table WHERE student_id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting student:', err);
      return res.status(500).json({ error: 'Failed to delete student' });
    }
    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  });
});

// Delete a teacher record by ID
app.delete('/api/admin/teacher-table/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM teacher_table WHERE teacher_id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting teacher:', err);
      return res.status(500).json({ error: 'Failed to delete teacher' });
    }
    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Teacher deleted successfully' });
    } else {
      res.status(404).json({ message: 'Teacher not found' });
    }
  });
});

// Delete a receptionist record by ID
app.delete('/api/admin/receptionist-table/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM receptionist_table WHERE receptionist_id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error deleting receptionist:', err);
      return res.status(500).json({ error: 'Failed to delete receptionist' });
    }
    if (results.affectedRows > 0) {
      res.status(200).json({ message: 'Receptionist deleted successfully' });
    } else {
      res.status(404).json({ message: 'Receptionist not found' });
    }
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
