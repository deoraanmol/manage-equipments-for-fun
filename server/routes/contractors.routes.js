const router = require('express').Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const { verifyAdminRole, verifyJWT } = require('../middleware');
const constants = require('../secrets/constants');

router.post('/login', async (req, res) => {
    console.log("here starts!: " + JSON.stringify(req.body))
    const loginDetails = req.body;
    const result = await db.query('SELECT * FROM contractors WHERE username=$1 AND password=$2', [loginDetails.username, loginDetails.password]);
    console.log("here starts2!: " + JSON.stringify(result))
    const contractor = result.rows?.length > 0 ? result.rows[0] : null;
    if (contractor) {
        const loggedInDetails = {
            id: contractor.id,
            username: contractor.username,
            roles: contractor.roles,
        };
        const token = jwt.sign(loggedInDetails, constants.jwtSecret, { expiresIn: '1d' });
        console.log("here success!")
        return res.json({ ...loggedInDetails, token });
    } else {
        res.status(400).send("Invalid username/password!");
    }
});

router.get('/', verifyJWT, verifyAdminRole, async (req, res) => {
    const result = await db.query('SELECT * FROM contractors');
    const contractors = result.rows.map(c => {
        return { id: c.id, username: c.username }
    });
    res.json(contractors);
});

module.exports = router;