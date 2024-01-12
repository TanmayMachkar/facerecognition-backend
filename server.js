const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req,res) => {
	res.send(database.users)
})

app.post('/signin', (req,res) =>{
	bcrypt.compare("apples", "$2a$10$feNcNmCttasAWGq9zMAfOe7Oq.pRN4kA/aO5HDZx3xrCTHbbgvJW6", function(err, res) {
    	console.log('1st guess',res)
	});

	bcrypt.compare("veggies", "$2a$10$feNcNmCttasAWGq9zMAfOe7Oq.pRN4kA/aO5HDZx3xrCTHbbgvJW6", function(err, res) {
	    console.log('2nd guess',res)
	});
	if(req.body.email === database.users[0].email && req.body.password === database.users[0].password)
	{
		res.json('success');
	}
	else
	{
		res.status(400).json('error logging in')
	}
})

app.post('/register', (req, res) => {
	const {email, name, password} = req.body;
	// bcrypt.hash(password, null, null, function(err, hash) {
	// 	console.log(hash);
	// });
	database.users.push({
		id: '124',
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	let found = false;
	database.users.forEach(users => {
		if(users.id === id)
		{
			found = true;
			return res.json(users);
		}
	})
	if(!found)
	{
		res.status(400).json('user not found')
	}
})

app.put('/image', (req, res) => {
	const {id} = req.body;
	let found = false;
	database.users.forEach(users => {
		if(users.id === id)
		{
			found = true;
			users.entries++;
			return res.json(users.entries);
		}
	})
	if(!found)
	{
		res.status(400).json('user not found')
	}
})

app.listen(3000, () => {
	console.log('app running on port 3000....')
})