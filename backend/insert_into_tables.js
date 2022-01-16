let db = require("./connect_db")


/**
 * 
 * @param {Date} date 
 * @returns {string} formatted date string in "YYYY-MM-DD hh:mm:ss"
 */
function formatting_date(date) {
    const addZero = (num) => `${num}`.padStart(2, '0');

    let year = date.getFullYear();
    let month = addZero(date.getMonth() + 1); //getMonth() returns 0-11
    let day = addZero(date.getDate());
    let hour = addZero(date.getHours());
    let minute = addZero(date.getMinutes());
    let second = addZero(date.getSeconds());
    let formatted = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return formatted;
}



/**
 * 
 * @param {string} name 
 * @param {string} date with format "YYYY-MM-DD hh:mm:ss"
 * @param {double} lat 
 * @param {double} lon 
 * @param {string} transport 
 */
//insert entries into lost_and_found.found_items
//if transport is provided, please set lat = lon = NULL, vice,versa
function insert_found_items(name, date, lat, lon, transport) {
    let sql = `INSERT INTO found_items VALUES (${name},${date},${lat},${lon},${transport} )`;
    db.insert_entries(sql);
}

/**
 * 
 * @param {string} name 
 * @param {string} date with format "YYYY-MM-DD hh:mm:ss"
 * @param {double} lat 
 * @param {double} lon 
 * @param {string} transport 
 */
//insert entries into lost_and_found.found_items
//if transport is provided, please set lat = lon = NULL, vice,versa
function insert_lost_items( name, date, lat, lon, transport) {
    let sql = `INSERT INTO lost_items VALUES (${name},${date},${lat},${lon},${transport} )`;
    db.insert_entries(sql);
}

//second-entry = zero-based month (0-11)
//fourth-entry(hr) in 24-hour format
console.log(formatting_date(new Date(2021,0,15,16,17,1))); 

//current time
console.log(formatting_date(new Date())); 


module.exports = {insert_found_items, insert_lost_items, insert_entries, formatting_date};