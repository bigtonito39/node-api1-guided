//this is how you would do a server without express

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

server.listen(8080, () => {
	console.log(`server started at http://localhost:8080`)
})