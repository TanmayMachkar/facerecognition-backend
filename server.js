const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'postgres',
    password : 'tanmay143459!',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app = express();
app.use(express.json());

app.use(cors())
app.get('/', (req,res) => {
	res.send(database.users);
})

//signin -> POST = success/fail
app.post('/signin', (req, res) => {signin.handleSignin(req,res,db,bcrypt)})

//register -> POST = user
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

//profile/:userId -> GET = user
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req,res,db)})

//image -> PUT -> user
app.put('/image', (req,res) => {image.handleImage(req,res,db)})

// Load hash from your password DB.

app.listen(3000, () => {
	console.log('app is running on port 3000');
})