let db = require("./connect_db");
let tables = require("./create_tables");
let index = require("./index.js");


(async () => {
    await db.drop_db(db.db_name);                 //command 1
    let create = await db.create_db(db.db_name);  //command 2
    await tables.create_tables();                 //command 3
    // db.con.end();
})();

//PLEASE FIRST RUN command 1, then command 2, then command 3 SEPARATELY.
// (async () => {
//     await tables.reset_tables();

//     //found_items
//     await tables.insert_found_items("wallet", "2021-01-04 00:12:59", null, null, "99", "https://na.cx/SA2nh5jd", "7788541238"); //1
//     await tables.insert_found_items("bottle", "2021-01-04 17:15:01", null, null, "49", "https://www.google.com/sndskfD54E", "fndinfkem@gmail.com"); //2
//     await tables.insert_found_items("bottle", tables.formatting_date(new Date()), 49.26073, -123.24598, null, "www.dsjghdsj.com/sehgHUUGu", "sdfbdsjhfb@outlook.com"); //3

//     //lost_items
//     await tables.insert_lost_items("lipstick", "2021-01-03 00:12:59", null, null, "99");
//     await tables.insert_lost_items("airpods", "2021-01-04 11:57:59", 49.261, -123.3, null);
//     await tables.insert_lost_items("airpods", tables.formatting_date(new Date()), null, null, "Canada Line");

//     // make hashtag_map
//     lost_items_id = 1
//     let map_found_1 = new Map([["black", 0], ["wallet", 1]]);
//     let map_found_2 = new Map([["blue", 0], ["bottle", 1], ["nike",0]]);
//     let map_found_3 = new Map([["orange", 0], ["bottle", 1]]);

//     let map_lost_1 = new Map([["red", 0], ["lipstick", 1], ["dior", 0]]);
//     let map_lost_2 = new Map([["white", 0], ["airpods", 1], ["apple", 0]]);
//     let map_lost_3 = new Map([["black", 0], ["wallet", 1],  ["apple", 0]]);

//     let map_lost = [map_lost_1,map_lost_2, map_lost_3];
//     let map_found = [map_found_1, map_found_2, map_found_3];

//     for (let i = 0; i < 3; i++) {
        
//         await tables.add_hashtag(i+1, map_lost[i], 0);
//         await tables.add_hashtag(i+1, map_found[i], 1);
//     }



//     // //print QUERY result
//     // //NOTE: JS automatically converts time in MySQL to UTC (GMT+0)...
//     list = ["found_items", "lost_items", "hashtags", "mapping_found", "mapping_lost"];
//     for (var name of list) {
//         let result = await db.query_select(`SELECT * FROM ${name}`);
//         console.log(result);
//     }
//     db.con.end();
// })();


// ( async() => {
//     var result = [];
//     await index.select_found_items_by_hashtag_id(10, [0, 100], [], result);
//     console.log(result[0]);
// })();

