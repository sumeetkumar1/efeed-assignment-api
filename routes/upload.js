///dependencies required to upload photos
const upload = require("../middleware/upload");
const dbConfig = require("../db/db");
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const url = dbConfig.url;
const client = new MongoClient(url); 

const express = require("express"); 
const router = express.Router(); 
  
  ///Upload functions
  router.post('/uploadPhoto', async function (req, res) {
    try {
      await upload(req, res);
      console.log(req.file);
      if (req.file == undefined) {
        return res.send({
          message: `You must select a file.`,
        });
      }
      return res.send({
        message: `File has been uploaded.`,
      });
    } catch (error) {
      console.log(error);
      return res.send({
        message: `Error when trying upload image: ${error}`,
      });
    }
  });
  
  module.exports = router; 