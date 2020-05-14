const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile =require('./routes/api/profile');
const posts =require('./routes/api/posts');

const app = express();

//test CORS header fix *==TEST CASE CHANGE DEAFAULT ALOW ALL TO CERTAIN PROXY
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

//Body-parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB conected'))
    .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

//Passport Configuration
require('./config/passport')(passport);

//Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000;
console.log('before listen');
app.listen(port, () => console.log(`Server runnig on port ${port}`));