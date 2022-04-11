const router = require('express').Router();
const db = require('../db');
const jwt = require('jsonwebtoken');
const { verifyAdminRole, verifyJWT } = require('../middleware');
const constants = require('../secrets/constants');

router.get('/', verifyJWT, async (req, res) => {
    const result = await db.query('SELECT * FROM equipments');
    const equipments = result.rows;
    res.json(equipments);
});

router.get('/available', verifyJWT, async (req, res) => {
    const result = await db.query('SELECT * FROM equipments WHERE id NOT IN (SELECT equipment_id FROM booked_equipments)');
    const equipments = result.rows;
    res.json(equipments);
});

router.post('/book/:equipmentId', verifyJWT, async (req, res) => {
    const equipmentId = req.params.equipmentId;
    const contractorId = req.contractorDetails.id;
    try {
        const result = await db.query('INSERT INTO booked_equipments VALUES($1, $2)', [equipmentId, contractorId]);
        const equipments = result.rows;
        res.json(equipments);
    } catch (e) {
        res.status(400).send(`Exception while booking an equipment: ${e}`);
    }
});

router.get('/booked-equipments', verifyJWT, verifyAdminRole, async (req, res) => {
    const result = await db.query(`select eq.*, con.username from booked_equipments beq 
        join equipments eq on beq.equipment_id = eq.id join contractors con on beq.contractor_id = con.id`);
    const bookingDetails = result.rows;
    res.json(bookingDetails);
});

module.exports = router;