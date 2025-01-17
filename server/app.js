// TODO move to Deno.js with TS support
// TODO GET for pictures Schema
// ??? decide move to graphQl from REST or not

require('./config/config');
require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const rtsIndex = require('./routes/index.router');

const app = express();

app.use('/pictures', express.static(__dirname + '/uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);


app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    
});

app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));
