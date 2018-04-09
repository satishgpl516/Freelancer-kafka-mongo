var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'test',
    password: 'pass',
    database: 'freelancer',
    port: 3306

})

module.exports= pool;