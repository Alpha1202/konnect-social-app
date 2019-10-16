const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./utils/fbAuth')

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login } = require('./handlers/users');


// Get All Screams route
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream);

// Users route
app.post('/signup', signup); 
app.post('/login', login);


exports.api = functions.https.onRequest(app);