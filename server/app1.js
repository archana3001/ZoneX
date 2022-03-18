const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{
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
        const body=[];
        req.on('data',(chunk)=>{
        body.push(chunk);
    });

    return req.on('end',()=>{
        const parsedBody = Buffer.concat(body).toString();
        console.log(parsedBody);
        const message = parsedBody.split('=')[1];
        // Synchronous method (Blocking)
        // fs.writeFileSync('message.txt',message);
        // res.statusCode=302;
        // res.setHeader('Location','/');
        // return res.end();

        // Ascynchronous method
        fs.writeFile('message.txt',message,(err)=>{
        res.statusCode=302;
        res.setHeader('Location','/');
        return res.end();
        });
    })

    }

    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>First</title></head>');
    res.write('<body><h1>HI</h1></body>');
    res.write('</html>');
    res.end();
})

server.listen(3030);