const express = require('express');

// Router is like mini express request handler
const router = express.Router();

router.get('/signup',(req,res,next)=>{
    res.send('<form action="/space" method="POST"><input type="text" name="email"><button type="submit">add</button></form>');
})

router.post('/space',(req,res,next)=>{
    // To accept and parse request body
    console.log(req.body);
    
    // res.redirect('/'); // For redirecting
    res.send('<h1>space</h1>');
})


module.exports = router;