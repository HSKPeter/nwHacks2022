//for creating tables in database: "lost_and_found"
let db = require("./connect_db")

async function create_tables() {
    //db.con.connect(function(err) {
    //    if (err) throw err;


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
        
        await db.async_query(s);

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
        
        await db.async_query(s);

        //table 3: hashtags
        //for BOOLEAN, 0:false , non-0: true
        var s = `CREATE TABLE IF NOT EXISTS hashtags (
            hashtag_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL default '',
            isObject BOOLEAN NOT NULL default 0,
            INDEX (name)
            )
        `;
        
        await db.async_query(s);

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

        await db.async_query(s);

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

        return db.async_query(s);
    };


async function reset_tables() {
    list = ["mapping_found", "mapping_lost", "found_items", "lost_items", "hashtags"];
    for (var name of list) {
        let result = await db.async_query(`DELETE FROM ${name}`);
        console.log(result);
        result = await db.async_query(`ALTER TABLE ${name} AUTO_INCREMENT = 0;`);
        //console.log(result);
    }
}


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
 * @param {string} s 
 * @returns {string} '${s}'
 */
let add_single_quote = s => "'" + s + "'";

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
    if (lat == null) {
        transport = add_single_quote(transport);
    } else {
        lat = add_single_quote(lat);
        lon = add_single_quote(lon);
    }
    let sql = `INSERT INTO found_items VALUES (null, '${name}','${date}',${lat},${lon},${transport})`;
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
    if (lat == null) {
        transport = add_single_quote(transport);
    } else {
        lat = add_single_quote(lat);
        lon = add_single_quote(lon);
    }
    let sql = `INSERT INTO lost_items VALUES (null, '${name}','${date}',${lat},${lon},${transport})`;
    db.insert_entries(sql);
}



/**
 * hashtag ALL LOWERCASE PLEASE;
 * @param {int} item_id = found ? found_items_id : lost_items_id;
 * @param {map} map_hashtag map of {key = hashtag, val = isObject} to be associated with item
 * @param {boolean} found non-0 if item is found_item, 0 if item is lost_item 
 */
async function add_hashtag(item_id, map_hashtag, found) {
    //query: select id from {table} where hashtag_name == list_hashtag[i]
    // if empty: create new entry + associate
    // if not empty: associate

    let table_name = (found) ? "mapping_found" : "mapping_lost";

    for (var i of map_hashtag.entries()) {
        let hashtag = i[0];
        let isObject = i[1];

        
        
        // (async () => {
            
            let query_result = await db.query_select(`SELECT hashtag_id FROM hashtags WHERE name='${hashtag}'`)
            
            
            
            var hashtag_id;

            if (query_result.length == 0) {
                let insert_result = await db.async_query(`INSERT INTO hashtags VALUES (null, '${hashtag}', '${isObject}')`);
                hashtag_id = await db.async_query(`SELECT LAST_INSERT_ID()`);
                hashtag_id = hashtag_id[0]['LAST_INSERT_ID()']
            } else {
                hashtag_id = query_result[0].hashtag_id;
            }
            //console.log(hashtag_id);
            let insert_result = await db.async_query(`INSERT INTO ${table_name} VALUES (null, '${hashtag_id}','${item_id}')`);
        
        // })();
    }
    

}

//second-entry = zero-based month (0-11)
//fourth-entry(hr) in 24-hour format
console.log(formatting_date(new Date(2021,0,15,16,17,1))); 

//current time
console.log(formatting_date(new Date())); 


module.exports = {insert_found_items, reset_tables, insert_lost_items,add_hashtag, formatting_date, create_tables};

