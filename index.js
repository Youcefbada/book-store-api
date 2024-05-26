const express = require("express") ; 
const app = express()
// if the request for / main page print the next()
app.get('/', (req,res) => {
    res.send("Hello World this node js using express ")
});
// sending json file using api
const books = [
    {
        id:1,
        name:'youcef',
        second_name : 'bada'
    },
    {
        id:2,
        name:'test',
        second_name:'test2'
    }
]
app.get('/api/books',(req,res) =>{
    res.json(books)
});
// when we add /:id we mean that the id is parameter 
// to get the value of thsi param we need to write this : req.params.id :: id is the var we need it 
// any parameter we get from the url is string we need to convert it into the type we need and then work with it 
app.get('/api/boaoks/:id',(req,res) =>{
    const book = books.find( b => b.id ===  parseInt(req.params.id));
    if(book){
        res.status(200).json(book)
    }
    else{
        res.status(400).json({message:"book not found"})
    }
})
// post method is to get data from the client as json 
// express js is javascript framwork it don't understand json 
app.use(express.json())
// know it undrstand the json 
// the req has two part the head is the params and the body that get the data from client as json file 
app.post('/api/books/addbook', (req,res) => {
    const book = {
        id : books.length  +1 , 
        name : req.body.name , 
        second_name : req.body.second_name 
    }
    res.json(book)
    books.push(book)
    console.log(books)
})
app.listen(80,() =>{
    console.log("the server is runing in the port 80")
});
