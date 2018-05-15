import express = require('express');
import { Application } from 'express';

// Routes
import { router as todosRoutes } from './api/routes/todosRoutes';

import bodyParser = require('body-parser');
import morgan = require('morgan');
import dotenv = require('dotenv');
import cors = require('cors');


// Configuraciones
const environ: dotenv.DotenvResult = dotenv.config({ path: './variables.env' });
if(environ.error) {
    throw environ.error
}

const app: Application = express();
app.set('port', process.env.PORT || 4000);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
}));

// Rutas
app.use('/', todosRoutes);

// Server
app.listen(app.get('port'), (error:Error) => {
    if(error) {
        return console.log(error);
    }
    return console.log(`Server running in port ${app.get('port')}`);
});