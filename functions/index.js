const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

admin.initializeApp();

const firebaseConfig = {
    apiKey: "AIzaSyDPubHGXUbaMFEaydLzvdA_yW94x6q3Gto",
    authDomain: "konnect-8dd5c.firebaseapp.com",
    databaseURL: "https://konnect-8dd5c.firebaseio.com",
    projectId: "konnect-8dd5c",
    storageBucket: "konnect-8dd5c.appspot.com",
    messagingSenderId: "184211229322",
    appId: "1:184211229322:web:ca6d0dc97dc628f92b3b73",
    measurementId: "G-BKK3142WGQ"
  };


const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const db = admin.firestore();

app.get('/screams', (req, res) => {
    db.collection('screams').orderBy('createdAt', 'desc').get().then(data => {
        let screams = [];
        data.forEach(docs => {
            screams.push({
                screamId: docs.id,
                body: docs.data().body,
                userHandle: docs.data().userHandle,
                createdAt: docs.data().createdAt,
            });
        });
        return res.json(screams);
    })
    .catch(err => console.error(err))
})

app.post('/scream', (req, res) => {
    const newScream = {
        body: req.body.body,
        userHandle: req.body.userHandle,
        createdAt: new Date().toISOString()
    };
    
    db.collection('screams').add(newScream).then(doc => {
        res.json({message: `document ${doc.id} was created successfully`});
    })
    .catch(err => {
        res.status(500).json({error: 'something went wrong'});
        console.error(err);
    })
});

// Signup route
app.post('/signup', (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    };
    // validate User
    let token, userId;
    db.doc(`users/${newUser.handle}`).get()
        .then(doc => {
            if(doc.exists){
                return res.status(400).json({ handle: 'this handle is already taken'});
            } else {
                return  firebase
                .auth().
                createUserWithEmailAndPassword(newUser.email, newUser.password)
            }
        })
        .then(data => {
            userId = data.user.uid;
           return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
           const userCredentials = {
               handle: newUser.handle,
               email: newUser.email,
               createdAt: new Date().toISOString(),
               userId
           };
           return db.doc(`/users/${newUser.handle}`).set(userCredentials)
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch(err => {
            console.error(err);
            if(err.code === 'auth/email-already-in-use'){
                return res.status(400).json({ email: 'Email is already in use' }); 
            } else {
                return res.status(500).json({error: err.code});
            }
        });
}); 


exports.api = functions.https.onRequest(app);