const express = require('express');
const projects = require('./data.json').projects;

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', {projects});
});

app.get('/about', (req, res) => {
    throw new Error(500);
    res.render('about');
});

app.get('/project/:id', (req, res) => {
    const id = req.params.id;
    const project = projects[id];
    res.render('project', {project});
});

app.use((req, res, next) => {
    const err = new Error();
    err.status = 404;
    err.message = "Not Found";
    next(err);
});

app.use((err, req, res, next) => {
    if (err.status && err.message) {
        res.status(err.status);
        console.log(err.status);
        console.log(err.message);
        if (err.status === 404) {
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

app.listen(3000);