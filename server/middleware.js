const jwt = require('jsonwebtoken');
const constants = require("./secrets/constants");

const verifyJWT = (req, res, next) => {
    const header = req.headers.authorization;
    try {
        const encodedJWT = header.split(' ')[1];
        const contractorDetails = jwt.verify(encodedJWT, constants.jwtSecret);
        if (contractorDetails) {
            req.contractorDetails = contractorDetails;
            next();
        } else {
            res.status(401).send("Invalid JWT!");
        }
    } catch (e) {
        res.status(400).send("Invalid JWT format!");
    }

}

const verifyAdminRole = (req, res, next) => {
    if (req.contractorDetails.roles.indexOf("AdminContractor") > -1) {
        next();
    } else {
        return res.status(403).send("This route is for AdminContractor Role!");
    }
}
module.exports = {
    verifyJWT,
    verifyAdminRole
}