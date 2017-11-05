var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'mysql.pjsoftware.com.br',
    user: 'pjsoftware02',
    password: 'tecweb381',
    database: 'pjsoftware02'
});

module.exports = connection;
