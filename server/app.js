const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
    // console.log(req.url, req.method, req.headers);

    const url = req.url;
    const method=req.method;

    if(url==='/'){
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<head><title>First</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="mess"><button type="submit">send</button></form></body>');
        res.write('</html>');
        return res.end(); 
    }

    if(url === '/message' && method==='POST'){

    // For parsing request bodies
    // Request bodies come in streams

    const body=[]; //for storage of request data coming chunks by chunks
    req.on('data',(chunk)=>{
        body.push(chunk);
        console.log(chunk); //For testing
    });

    // for end of stream
    // Executed asynchronously {After some time}
    // To make it synchronous add return before req.on
    req.on('end',()=>{
        // For concatenating entire array of chunks in string
        const parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody);
        // For recording message
        const message = parsedBody.split('=')[1];
        fs.writeFileSync('message.txt',message);
    })

    res.statusCode=302;
    res.setHeader('Location','/');
    return res.end();
    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>First</title></head>');
    res.write('<body><h1>HI</h1></body>');
    res.write('</html>');
    res.end();
})

server.listen(3030);