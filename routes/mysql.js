var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'test',
    password: 'pass',
    database: 'freelancer',
    port: 3306

});

function fetchData(callback,sqlQuery){

    console.log("\nSQL Query::"+sqlQuery);

    pool.getConnection(function(err,connection) {

        connection.query(sqlQuery, function (err, rows, fields) {
            if (err) {
                console.log("ERROR: " + err.message);
            }
            else {	// return err or result
                console.log("DB Results:" + rows);
                callback(err, rows);
            }
        });
        console.log("\nConnection closed..");
        connection.release();
    });
}

function executeQuery(callback, sqlQuery){

    console.log("\nSQL Query::"+sqlQuery);


    pool.getConnection(function(err,connection) {
        if(err){
            throw err;
        }

        connection.query(sqlQuery, function (err, result) {
            callback(err);
        });
        console.log("\nConnection closed..");
        connection.release();
    });
}


exports.fetchData=fetchData;
exports.executeQuery=executeQuery;

