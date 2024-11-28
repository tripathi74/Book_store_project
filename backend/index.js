import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {      // used to get HTTP method ,  '/' is taken as a route
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);            // mounts a router (booksRoute) to handle requests at the /books path.

mongoose
  .connect(mongoDBURL)                   // connect to the database
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {     // app.listen(port, callback) :Starts the server and listens for connections on the specified port,
                                 //  allowing the app to listen for incoming HTTP requests
      console.log(`App is listening to port: ${PORT}`);    //console.log() is a function used to print output to the console.
    });
  })
  .catch((error) => {
    console.log(error);
  });
