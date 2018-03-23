const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, resp, next) => {
    var now = new Date().toString();
    var log = now + req.method + req.url;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
	if (err) {
	    console.log('Cannot append to server.log.')
	}
    });
    next();
});

/*
app.use((req, res, next) => {
    res.render('maintenance.hbs', {
    });
});
*/

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


app.get('/', (req, res) => {
    //    res.send('<h1>hello express</h1>');
    res.render('home.hbs', {
	pageTitle: 'My Home Page',
	wcomeMsg: 'Welcome to my home'
    });
});


app.get('/about', (req,res) => {
    res.render('about.hbs', {
    });
});



app.get('/bad', (req,res) => {
    res.send({
	errorMsg: 'A bad request'
    })
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
