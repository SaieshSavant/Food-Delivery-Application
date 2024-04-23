const express = require('express')
const router = express.Router()

router.post('/fooddata',(req,res)=>{
    try {
     
        res.send([global.fooditems,global.foodCategory]);
        console.log([global.fooditems,global.foodCategory]);
    } catch (error) {
        console.error(error.message);
        res.send("Server error");
    }
})


module.exports = router;