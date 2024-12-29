const express = require('express');
const { addPackage, getStudentPackages } = require('../controllers/packageController');

const router = express.Router();

router.post('/packages', addPackage);
router.get('/student-packages', getStudentPackages);

module.exports = router;
