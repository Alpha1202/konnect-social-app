require('dotenv').config()
const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./utils/fbAuth')

const { getAllScreams, postOneScream } = require('./handlers/screams');
const { signup, login, uploadImage, addUserDetails } = require('./handlers/users');


// Get All Screams route
app.get('/screams', getAllScreams)
app.post('/scream', FBAuth, postOneScream);

// Users route
app.post('/signup', signup); 
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage)
app.post('/user', FBAuth, addUserDetails)


exports.api = functions.https.onRequest(app);