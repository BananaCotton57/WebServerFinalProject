// Load the http module to create an http server.
const express = require('express')
const usersController = require('./controllers/usersController')
const activityController = require('./controllers/activityController')
const exerciseTypesController = require('./controllers/exerciseTypesController')

const PORT = 8000

const app = express();
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