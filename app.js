const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const pageRoute = require('./routes/pageRoute');
const courseRoute = require('./routes/courseRoute');
const categoryRoute = require('./routes/categoryRoute');
const userRoute = require('./routes/userRoute');
const app = express();

// Connect DB
mongoose
	.connect('mongodb://localhost/smartedu-db')
	.then(() => {
		console.log('Db connected successfuly');
	})
	.catch((err) => {
		console.log(err);
	});
//Template Engine
app.set('view engine', 'ejs');

//global variable
global.userIN = null;

//Middleware
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static('public'));
app.use(
	session({
		secret: 'my_keyboard_cat',
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smartedu-db' }),
	})
);

//Routes
app.use('*', (req, res, next) => {
	userIN = req.session.userID;
	next();
});
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
const port = 3000;
app.listen(port, () => {
	console.log(`App started on port ${port}`);
});
