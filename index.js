const express = require("express") ; 
// this is a good libary to use the validation method to controll the data from the client 
const app = express()

// if the request for / main page print the next()
app.get('/', (req,res) => {
    res.send("Hello World this node js using express ")
});
// sending json file using api

app.listen(80,() =>{
    console.log("the server is runing in the port 80")
});
