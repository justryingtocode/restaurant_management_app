// Importing the express module
import express from 'express';
import router from 'router';
import bodyParser from 'body-parser';
import cors from 'cors';
import route from './route/route.js';
const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Initializing the data with the following string
const port = process.env.PORT || 9000;
app.use(bodyParser.json());
app.use(cors());
app.use(route);

// Setting up the server at port 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});