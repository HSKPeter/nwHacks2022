//for deleting database: "lost_and_found"
//then can rerun create.js and create_tables.js to update table columns 

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

    con.query(`DROP DATABASE ${db_name}`, function(err, result) {
        if (err) throw err;
        console.log(`DB ${db_name} Dropped!`);
    });
});
