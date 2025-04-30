// Load the http module to create an http server.
const express = require('express')
const usersController = require('./controllers/usersController')
const activityController = require('./controllers/activityController')
const exerciseTypesController = require('./controllers/exerciseTypesController')

require('dotenv').config() // Load environment variables from .env file

console.log('SUPABASE_URL:', process.env.SUPABASE_URL); //debug
console.log('SUPABASE_SECRET_KEY:', process.env.SUPABASE_SECRET_KEY); //debug

const PORT = process.env.PORT ?? 8000

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})
  app.use(express.json())

//Controllers
//A controller is a function that handles the request and response objects.
//It is responsible for processing the request, interacting with the model, and sending the response back to the client.
app
  .get('/hello', (req, res) => {
    res.send('Hello New Paltz, NY!!!')
  })
  .use('/api/v1/users', usersController)
  .use('/api/v1/activities', activityController)
  .use('/api/v1/exerciseTypes', exerciseTypesController)
  
  .use('/', express.static('dist')) //vue client uses dist

//Error handling middleware
//This middleware is used to handle errors that occur in the application.
app.use((err, req, res, next) => {
    console.error(err)
    const status = err.status || 500
    const message = err.message || 'Oops! Something went wrong.'
    const error = {
        status,
        message
    }
    //I could probably compress this code into one line in the error const 
    res.status(status).send(error)
})

// Listen on port 8000, IP defaults to
//
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
});


console.log('Hello World!')