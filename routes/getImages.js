///dependencies required to get photos
const dbConfig = require("../db/db");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = dbConfig.url;
const client = new MongoClient(url); 
const express = require("express"); 
const router = express.Router(); 


router.get('/getImages', async function (req, res) {
    try {
        await client.connect();
        const database = client.db(dbConfig.database);
        const images = database.collection(dbConfig.imgBucket + ".files");
        const cursor = images.find({});
        if ((await cursor.count()) === 0) {
          return res.status(500).send({
            message: "No files found!",
          });
        }
        let fileInfos = [];
        await cursor.forEach((doc) => {
          fileInfos.push({
            name: doc.filename,
          });
        });
        return res.status(200).send(fileInfos);
      } catch (error) {
        return res.status(500).send({
          message: error.message,
        });
      }
}); 

module.exports = router; 