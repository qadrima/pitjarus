var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "",
    database: "pitjarus"
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Mysql Connected!");
});

module.exports = db;