var Link = require('./models/link');

module.exports = function(app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/list', function(req, res) {

		// use mongoose to get all todos in the database
		Link.find({},function(err, link) {
			console.log('all');
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(link); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/list', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Link.create({
			id : req.body.id,
			author: req.body.author,
			description:req.body.description
		}, function(err, link) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Link.find(function(err, links) {
				if (err)
					res.send(err)
				res.json(links);
			});
		});

	});

	// delete a todo
	app.delete('/api/list/:id', function(req, res) {
		Link.remove({
			id : req.params.id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Link.find(function(err, links) {
				if (err)
					res.send(err)
				res.json(links);
			});
		});
	});

	app.get('/api/link/:id', function(req, res) {

		// use mongoose to get all todos in the database
		Link.find({id:id},function(err, link) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(link); // return all todos in JSON format
		});
	});

	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendfile('/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
};