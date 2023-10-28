const { Result } = require('express-validator');
const mongoose = require('mongoose');
let uri = `mongodb+srv://saieshsawant70:nayana12@cluster0.jufyd68.mongodb.net/GOFOOD?retryWrites=true&w=majority`
// let client= new mongodb.MongoClient(uri)

// async function connect(){
//     await client.connect();
//     console.log("database connected")
// }

// async function fetch(){

//     let db = client.db()
//     let itemsCollection = db.collection('fooditems')
//     let items = await itemsCollection.findOne()
//     console.log(items)
// }
// connect();
// fetch();
// const mongodb = async () => {
//     try{
//     await mongoose.connect(uri);
//     console.log("Connected to MongoDB");
//     const fetchdata=await mongoose.connection.db.collection("fooditems");
//    let items= fetchdata.findOne().toArray();
//     console.log(items);
//     }catch(error){
//         console.log(error)
//     }
//   };
//mongoose.set('strictQuery', false);

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

module.exports = mongodb;