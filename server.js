// Express to run server and routes
const express = require('express')

// Start up an instance of app
const app = express()
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())
app.use(express.static('website'))
const port = 3000
const server = app.listen(port, listening)

function listening(req, res) {
  console.log('listening on port', port)
}

let projectData = {}
app.get('/all', function (req, res) {
  res.send(projectData)
})

app.post('/feelings', function (req, res) {
  projectData = { ...req.body }
  res.send(projectData)
})
