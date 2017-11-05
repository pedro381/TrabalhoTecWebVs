var express = require('express');
var connection = require('./mysqlConnection');
var dateFormat = require('dateformat');
var formidable = require('formidable');
var fs = require('fs');
var guid = require('uuid');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('cadastro');
});

router.post('/', function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        var name = guid();
        var newpath = process.cwd() + '/public/Imagens/' + name;
        fs.rename(files.imagem.path, newpath, function (err) {
            if (err) throw err;
        });
        var sql = "INSERT INTO `pjsoftware02`.`Eventos` (`Titulo`, `Descricao`, `Data`, `Local`, `Imagem`) VALUES ?";
        var values = [[fields.titulo, fields.descricao, fields.data, fields.local, name]];
        console.log("fields", fields);
        connection.query(sql, [values], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
        });
        res.redirect('/');
    });
});

module.exports = router;
