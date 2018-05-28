import express = require('express');
import { Application } from 'express';

// Routes
import { router as todosRoutes } from './api/routes/todosRoutes';
import { router as usersRoutes } from './api/routes/usersRoutes';

import bodyParser = require('body-parser');
import morgan = require('morgan');
import dotenv = require('dotenv');
import cors = require('cors');
import favicon = require('serve-favicon');
import helmet = require('helmet');


// Configuraciones
const environ: dotenv.DotenvResult = dotenv.config({ path: './variables.env' });
if(environ.error) {
    throw environ.error
}

const app: Application = express();
app.set('port', process.env.PORT || 4000);

// Middleware
app.use(helmet());
app.use(helmet.noCache());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'maxcdn.bootstrapcdn.com']
    }
}))
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
})); // Revisar "origin" para ataque Croos-Site Reference Forgery

app.use(favicon('./src/public/favicon.ico'));

// Rutas
app.use('/todos', todosRoutes);
app.use('/', usersRoutes);

// Server
app.listen(app.get('port'), (error:Error) => {
    if(error) {
        return console.log(error);
    }
    return console.log(`Server running in port ${app.get('port')}`);
});