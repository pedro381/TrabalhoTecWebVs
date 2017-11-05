var express = require('express');
var connection = require('./mysqlConnection');
var dateFormat = require('dateformat');
var router = express.Router();

router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM Eventos ORDER BY Data DESC', function (err, rows, fields) {
        //res.end(JSON.stringify(rows));
        for (var i = 0; i < rows.length; i++) {
            rows[i].Data = dateFormat(rows[i].Data, "dd/mm/yyyy");
            rows[i].Descricao = rows[i].Descricao.substring(0, 500) + "...";
        }
        res.render('index', { title: "Eventos", rows: rows });
    });
});

module.exports = router;
