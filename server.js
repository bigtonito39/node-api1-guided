/* //RAW Server Starts here

const http = require("http")
const server = http.createServer((req, res) => {

	// a "successful" status code

	res.statusCode = 200
	// return some JSON to the client
	res.setHeader("Content-Type", "application/json")
	res.write(`{"message": "hello, world"}`)
	// send the response off
	res.end()

})

​

server.listen(8080, () => {
	console.log(`server started at http://localhost:8080`)
})

*/ //RAW Server ends here

//using express starts here

const express = require("express")
//make sure to have users as let, since we are mutating it.
let users =require("./users")
const server = express()

// this is middleware that allows express
//to parse JSON request bodies. We'll talk about this more later.
server.use(express.json)

server.get("/", (req, res) => {
res.json({message:"hello, world"})

})

server.get("/lambda", (req,res)=> {
    res.redirect("https://lambdaschool.com")
})
//simulating a real database call
server.get("/users", (req, res) => {
    res.json(users)
})

server.get("/users/:id", (req, res) => {
    //pull the ID value from the url
    const id = req.params.id;
    //find the specific user from our fake databas with that ID
    const user = users.find(u=> u.id ==id)

    //a user was found with that ID

    if(user) {
        //RETURN THE DATA TO THE CLIENT
        res.json(user)
    }else {
        //RETURN AN ERROR TO THE CLIENT
        res.status(404).json({message:"User not found"})
    }
})

server.post("/users", (req, res) => {
    //create a new fake user
    const newUser = {
        id:users.length + 1,
        name: req.body.name
    }
    //simulate the action of "inserting " to our database, 
    // we are just using to keep it simple, we wont use push in real world data base.
    users.push(newUser)
    //201 means success and a resource was created
    res.status(201).json(newUser)
})

server.delete("/users:id", (req, res) => {
  //find the specific user from our fake database with that ID
  const user = users.find(u => u.id == req.params.id)

  //user exist in the database
  if (user) {
                        //check thi  u.id !== req.params.id it might help for mimic site work at my job    
      users = users.filter(u => u.id !== req.params.id)
// a sucessful response with no response body
     res.status(204).end()

      //user does not exist in the database
  } else {
      res.status(404).json({message:"User not Found"})
      //return an error
  }

})

server.put("/users/:id", (req, res) => {
    //finds the location of the user we are updating in the fake database
    const index = users.findIndex(  u=> u.id == req.params.id)
//update that users name if a new value is sent in the request body
    if (req.body.name) {
        users[index].name = req.body.name
    }
// return the updated user data
    res.json(users[index])
})



//start the server on localhost at port 8080
const port = 8080
server.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})
//using express ends here




