const express = require('express');
const bodyParser = require('body-parser');
const db = require("./mysql");
const app = express();
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req,res,next){
    req.db = db;
    next();
});

// ---
const storeController = require('./controllers/storeController');
const brandController = require('./controllers/brandController');

app.get('/area', storeController.getArea);
app.get('/brand/report', brandController.getReport);

app.listen(8080, () => console.log(`Started server at http://localhost:8080!`));