// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const UserModel = require('../models/explorers.js');
// require("dotenv").config();



const express = require('express');
const UserModel = require('../models/explorers');
const router = express.Router();

const update = async(id,col)=>{
    try{
        const result = await UserModel.findByIdAndUpdate({
            _id:id
        },{
            $set:{
                colour:col
            }
        },{
            new:true,
            useFindAndModify:false
        });

        console.log(result);
    
    }catch (err){
        console.log(err);
    }    
}

router.post("/changecol",(req,res)=>{
    res.send("ok");
    console.log(req.body);
    update(req.body.id,req.body.colour);
})




module.exports = router;