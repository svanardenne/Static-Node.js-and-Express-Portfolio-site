const express = require('express');
const projects = require('./data.json').projects;

const app = express();

//Set public folder to serve on static route
app.use('/static', express.static('public'));

//Set Pug ad view engine
app.set('view engine', 'pug');

//Renders index route
app.get('/', (req, res) => {
    res.render('index', {projects});
});

//Renders about route
app.get('/about', (req, res) => {
    res.render('about');
});

//Handles project route
app.get('/project/:id', (req, res) => {
    const id = req.params.id;
    const project = projects[id];
    res.render('project', {project});
});

//Creates 404 Error object
app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Not Found";
    next(err);
});

//Global error handler
app.use((err, req, res, next) => {
    if (err.status && err.message) {
        res.status(err.status);
        if (err.status === 404) {
            console.log(err.status);
            console.log(err.message);
            res.render('page-not-found', {err});
        } else {
            res.render('error', {err});
        }
    } else {
        err.status = 500;
        err.message = 'Oops, something went wrong!'
        console.log(err.status);
        console.log(err.message);
        res.render('error', {err});
    }
});

//Initiate server
app.listen(3000);