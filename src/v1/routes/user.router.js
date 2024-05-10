const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const v1UserController = require('../controllers/user.controller');

router.use(bodyParser.json());

// register user
router.post('/register', (req, res) => v1UserController.register(req, res));

// login user
router.post('/login', (req, res) => v1UserController.login(req, res));

// log out user
router.post('/logout', (req, res) => {
	res.send('LogOut request received');
});

module.exports = router;
