//for creating tables in database: "lost_and_found"
let mysql = require ('mysql2');

//to be changed by your configuration
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000", 
    database: "lost_and_found"
});

con.connect(function(err) {
    if (err) throw err;

    console.log("DB Connected!");

    //table 1: found_items
    //date: yyyy-mm-dd hh:mm:ss (set timezone?)
    var s = `CREATE TABLE IF NOT EXISTS found_items (
        found_items_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL default '',
        date DATETIME,
        lat DOUBLE,
        lon DOUBLE,
        transport VARCHAR(255)
        )
    `;
    
    con.query(s, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    })

    //table 2: lost_items
    var s = `CREATE TABLE IF NOT EXISTS lost_items (
        lost_items_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL default '',
        date DATETIME,
        lat DOUBLE,
        lon DOUBLE,
        transport VARCHAR(255)
        )
    `;
    
    con.query(s, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    })

    //table 3: hashtags
    //for BOOLEAN, 0:false , non-0: true
    var s = `CREATE TABLE IF NOT EXISTS hashtags (
        hashtag_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL default '',
        isObject BOOLEAN NOT NULL default 0
        )
    `;
    
    con.query(s, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    })

    //table 4: mapping_found
    var s = `CREATE TABLE IF NOT EXISTS mapping_found (
        mapping_found_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        hashtag_id INT NOT NULL,
        found_items_id INT NOT NULL, 
        INDEX (hashtag_id),
        INDEX (found_items_id),

        FOREIGN KEY (hashtag_id) REFERENCES hashtags(hashtag_id),
        FOREIGN KEY (found_items_id) REFERENCES found_items(found_items_id)
        )
    `;

    con.query(s, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    })

    //table 5: mapping_lost
    var s = `CREATE TABLE IF NOT EXISTS mapping_lost (
        mapping_lost_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        hashtag_id INT NOT NULL,
        lost_items_id INT NOT NULL, 
        INDEX (hashtag_id),
        INDEX (lost_items_id),

        FOREIGN KEY (hashtag_id) REFERENCES hashtags(hashtag_id),
        FOREIGN KEY (lost_items_id) REFERENCES lost_items(lost_items_id)
        )
    `;

    con.query(s, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    })
});
