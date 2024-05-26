const express  = require("express")
const joi = require("joi")
const route = express.Router() ; 

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
route.get('/api/books',(req,res) =>{
    res.json(books)
});
// when we add /:id we mean that the id is parameter 
// to get the value of thsi param we need to write this : req.params.id :: id is the var we need it 
// any parameter we get from the url is string we need to convert it into the type we need and then work with it 
route.get('/api/boaoks/:id',(req,res) =>{
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
route.use(express.json())
// know it undrstand the json 
// the req has two part the head is the params and the body that get the data from client as json file 
route.post('/api/books/addbook', (req,res) => {
    // data validation is to check the value that we get from the client
    // this is old way 
    /*
    if(!req.body.name || req.body.name.length < 3){
        return res.status(400).json("the name is required and must be more than 3 char")
    }
    if(!req.body.second_name || req.body.length <3){
        return res.status(400).json("the second name is required and must be more than 3 char ")
    }
    */
   // the new way is
   const schema = joi.object({
        name : joi.string().min(3).required(),
        second_name : joi.string().min(3).required()
   })
   // the source of data that we will send it to the 
   // if there is a error in the data that send it from the client that will return error as obejct 
   const {error} = schema.validate(req.body)
   if(error){
        console.log("there is a problem in the data that we recive from the client ")
        return res.status(400).json({message : error.details}) // here to show the error deatils 
   }
    const book = {
        id : books.length  +1 , 
        name : req.body.name , 
        second_name : req.body.second_name 
    }
    res.json(book)
    books.push(book)
    console.log(books)
})

// update book deatils 
