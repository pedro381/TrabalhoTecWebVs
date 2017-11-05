var express = require('express');
var connection = require('./mysqlConnection');
var dateFormat = require('dateformat');
var router = express.Router();

router.get('/', function (req, res, next) {
    connection.query("SELECT * FROM Eventos where EventosId = '" + req.id + "'", function (err, rows, fields) {
        if (rows.length > 0) {
            rows[0].Data = dateFormat(rows[0].Data, "dd/mm/yyyy");
            res.render('evento', { evento: rows[0] });
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;
