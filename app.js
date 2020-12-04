const express = require('express');
const projects = require('./data.json').projects;

const app = express();

app.use('/static', express.static('public'))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/project/:id', (req, res) => {
    const id = req.params.id - 1;
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
        res.status(err.status || 500);
        console.log(err.status);
        console.log(err.message);
        next(err);
    }
});

app.listen(3000);