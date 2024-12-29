const db = require('../config/db');

const loginUser = (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT role FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (results.length > 0) {
      const userRole = results[0].role;
      res.status(200).json({ message: 'Login successful', role: userRole });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
};

module.exports = { loginUser };
