const express = require("express")
const app = express()
const cors = require("cors"); 
const port=4000;
const mongodb=require("./Config/Db");
mongodb();
app.use(cors({
  origin: "*"
}));



app.use(express.json());
app.use('/api',require("./Routes/Createuser"));
app.use('/api',require("./Routes/Displaydata"));
app.get('/',(req,res)=>{
  res.send("hello from saiesh")
})

app.listen(port,()=> console.log(`server running on ${port}`));