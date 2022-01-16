//for deleting database: "lost_and_found"
//then can rerun create.js and create_tables.create_tables() to update table columns 

let mysql = require ('mysql2');
const { database_password } = require("./api-keys");

//to be changed by your configuration
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: database_password, 
})

let db_name = "lost_and_found";

con.connect(function(err) {
    if (err) throw err;

    console.log("DB Connected!");

    con.query(`DROP DATABASE ${db_name}`, function(err, result) {
        if (err) throw err;
        console.log(`DB ${db_name} Dropped!`);
    });
});

con.end();