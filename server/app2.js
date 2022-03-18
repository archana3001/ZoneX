const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const spaceRoutes = require('./routes/signup');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const UserModel = require('./models/explorers.js');
const e = require('express');
require("dotenv").config();

const app = express(); // This variable is a valid request handler

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});

// use method is for adding middleware function / array of request handlers
// use method accepts a callback 
// callback function uses 3 arguments req, res, next(a function to be called after execution of the function / next middleware)

// app.use((req,res,next)=>{
//     console.log("Middleware");
//     next(); // to continue to another middleware
// })

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());


app.use(spaceRoutes);
// For postfix in routes , routes having some common segment
app.use('/admin',adminRoutes);

app.use('/user',userRoutes);

app.get('/test',(req,res)=>{
    UserModel.find({},(err,result)=>{
        if(err){
            res.json(err);

        }else{
            console.log(result);
            // res.write('<body><h1>HI</h1></body>');
            let res1 = [];
            for (const key in result){
                let dict = {};
                dict['name']=result[key]["name"];
                dict['email']=result[key]["email"];
                res1.push(dict);
            }
            res.json(res1);
        }    
    })
})

app.post('/save',async (req,res)=>{
    try{
    const user =req.body;
    const password =req.body.password;
    const confirmpassword =req.body.confirmpassword;
    if(password===confirmpassword){
        const newUser = new UserModel(user);
        await newUser.save();
        res.json(user);
    }else{
        res.send("Password mismatch");
    }
    }catch(err){
        res.status(400).send(err);
    }
});

app.post('/find',async (req,res)=>{
    try{
    const user =req.body;
    const upassword =req.body.upassword;
    const uemail =req.body.uemail;
    const udata = await UserModel.findOne({
         email:uemail
    });
    if(udata.password===upassword){
        res.json(udata);
    }
    else{
        res.status(400).send("Invalid Credentials");
    }
    }catch(err){
        res.status(400).send("Invalid Credentials");
    }
});

app.get('/',(req,res,next)=>{
    // console.log("In Middleware");

    // send method is used to send response and attach a body of type any
    // By default it is text/html; could be changed by setHeader method
    res.send('<h1>Home page</h1>');
})

// For 404 page
app.use((req,res,next)=>{
    res.status(404).send('<h1>Page not found</h1>'); 
})

// creating and listening to sever
// const server = http.createServer(app);
// server.listen(3030);

// Another method
const PORT = process.env.PORT || 3001
app.listen(PORT);