const db = require('../config/db');

// Add a package
const addPackage = (req, res) => {
  const { name, phone, dateDelivered, image } = req.body;

  const checkQuery = 'SELECT * FROM users WHERE name = ? AND phone = ?';
  db.query(checkQuery, [name, phone], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      const insertQuery = 'INSERT INTO packages (name, phone, dateDelivered, image) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [name, phone, dateDelivered, image], (insertErr) => {
        if (insertErr) {
          console.error(insertErr);
          return res.status(500).json({ error: 'Insert error' });
        }
        res.status(200).json({ message: 'Package added successfully.' });
      });
    } else {
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
};

// Get packages for a student
const getStudentPackages = (req, res) => {
  const { name, phone } = req.query;

  const query = 'SELECT * FROM packages WHERE name = ? AND phone = ?';
  db.query(query, [name, phone], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(200).json({ packages: results });
  });
};

module.exports = { addPackage, getStudentPackages };
