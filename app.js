const express = require('express');
const pageRoute = require('./routes/pageRoute');
const app = express();

//Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));

//Routes
app.get('/', (req, res) => {
	res.status(200).render('index', {
		page_name: 'index',
	});
});
app.use('/', pageRoute);
const port = 3000;
app.listen(port, () => {
	console.log(`App started on port ${port}`);
});
