
let mysql = require('mysql2');
const { database_password } = require("./api-keys");

let db_name = "lost_and_found"

//to be changed by your configuration
let con_no_db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: database_password
});

//to be changed by your configuration
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: database_password,
    database: "lost_and_found",
    dateStrings: true
});

/**
 * 
 * @param {string} sql non-select query
 */
function query(sql) {
    con.connect(function (err) {
        if (err) throw err;
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(`${sql} success`);
        })
    });
}

function async_query(sql) {
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            console.log(`${sql} success`);
            return err ? reject(err) : resolve(result);
        })
    })
};


/**
 * 
 * @param {*} sql select query
 */
//SELECT col_name FROM tbl_name WHERE col_name > 0;
function query_select(sql) {
    // con.connect(function(err) {
    //     if (err) throw err;
    //     con.query(sql, function (err, result, fields) {
    //         if (err) throw err;
    //         console.log(`${sql} success`);
    //         return result;
    //     })
    // });
    return new Promise((resolve, reject) => {
        con.query(sql, (err, result, fields) => {
            return err ? reject(err) : resolve(result);
        })
    })

}

/**
 * 
 * @param {string} sql order of insertion
 */
//EFFECTS: insert entries 
function insert_entries(sql) {
    async_query(sql);
};

function create_db(name) {
    let sql = `CREATE DATABASE if not exists ${name}`;

    return new Promise((resolve, reject) => {
        con_no_db.query(sql, (err, result) => {
            console.log(`DB ${name} created.`)
            return err ? reject(err) : resolve(result);
        })
    })
};

function drop_db(name) {
    let sql = `DROP DATABASE ${name}`;
    return async_query(sql);
};



module.exports = {
    mysql,
    con,
    con_no_db,
    db_name,
    query,
    query_select,
    async_query,
    insert_entries,
    create_db,
    drop_db
};