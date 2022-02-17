const express = require("express"); 
const router = express.Router(); 
///MongoDB
const MongoClient = require("mongodb").MongoClient; 
const databaseURL = 'mongodb://localhost:27017';
const client = new MongoClient(databaseURL); 

router.get("/", async function(req, res, next) {
    
    try {
        const result = await client.connect(); 
        const db = client.db("efeed"); 
        db.createCollection("efeed_imgs");
        res.send("collection create"); 
    } catch(e) {
        res.send("db error"); 
    }


}); 

module.exports = router; 