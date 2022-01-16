//for creating database: "lost_and_found"

let mysql = require ('mysql2');

//to be changed by your configuration
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000" 
})

let db_name = "lost_and_found";


con.connect(function(err) {
    if (err) throw err;

    console.log("DB Connected!");

    con.query(`CREATE DATABASE if not exists ${db_name}`, function(err, result) {
        if (err) throw err;
        console.log(`DB ${db_name} Created!`);
    });
});

con.end();
