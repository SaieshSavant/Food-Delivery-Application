const { Result } = require('express-validator');
const mongoose = require('mongoose');
require('dotenv').config();
let uri = process.env.uri

const mongodb = async () => {
  mongoose.connect(uri, { useNewUrlParser: true }, async (err, result) => {
    if (err) console.log("---", err);
    else {
      console.log("Connected");
      const fetchdata = await mongoose.connection.db.collection("fooditems");
      fetchdata.find({}).toArray(async function (err, data) {
        // if(err) console.log(err);
        // else {
        //   global.fooditems=data;
        const foodCategory = await mongoose.connection.db.collection("foodCategory");
        foodCategory.find({}).toArray(function (err, catdata) {
          if (err) console.log(err);
          else {
            global.fooditems = data;
            global.foodCategory = catdata;

          }
        })
      }
      )
    }
  })
}

mongoose.set('strictQuery', false);
module.exports = mongodb;