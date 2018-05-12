const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 4000;
const knex = require('knex')(require('./knexfile'));
// const cors = require('cors');
const logger = require('morgan');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.get('/todos', (req, res) => {
    knex.select()
        .from('todos')
        .then((todos) => {
            res.send(todos);
        });
});

app.get('/todos-of-user/:id', (req, res) => {
    knex.from('todos')
        .innerJoin('users', 'todos.user_id', 'users_id')
        .where('todos.user_id', req.params.id)
        .then((data) => {
            res.send(data);
        });
});

app.get('/todos/:id', (req, res) => {
    knex.select()
        .from('todos')
        .where('id', req.params.id)
        .then((todos) => {
            res.send(todos);
        });
});

app.post('/todos', (req, res) => {
    knex('todos').insert({
        title: req.body.title,
        user_id: req.body.user_id
    })
    .then(() => {
        knex.select()
            .from('todos')
            .then((todos) => {
                res.send(todos);
            });
    });
});

app.put('/todos/:id', (req, res) => {
    knex('todos')
        .where('id', req.params.id)
        .update({
            title: req.body.title,
            completed: req.body.completed
        })
        .then(() => {
            knex.select()
                .from('todos')
                .then((todos) => {
                    res.send(todos);
                });
        });
});

app.delete('/todos/:id', (req, res) => {
    knex('todos')
        .where('id', req.params.id)
        .del()
        .then(() => {
            knex.select()
                .from('todos')
                .then((todos) => {
                    res.send(todos);
                });
        });
});

app.listen(port, (err) => {
    if(err) {
        return console.log(err);
    }
    return console.log(`listening on port ${port}`);
});
