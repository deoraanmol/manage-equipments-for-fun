var express = require('express');
var app = express();
require('rootpath')();
var cors = require('cors');
var bodyParser = require('body-parser');
var utils = require('./utils');
var port = 8080;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
    console.log("here!!!!!")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Allow", "OPTIONS, GET, HEAD, POST");
    next();
});
app.use('/api/contractors', require('./routes/contractors.routes'));
app.use('/api/equipments', require('./routes/equipments.routes'));
app.use(utils.handleErrors);
app.listen(port, function () {
    console.log("Example app listening on port ".concat(port));
});
