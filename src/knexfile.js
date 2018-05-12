// update with your config settings
/*
var options = {
    development: {
        client: 'mysql',
        connection: {
            host: 'localhost',
            user: 'tutorial_root',
            password: 'tutorial_root',
            database: 'knex_video'
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migration: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds/production'
        }
    }
};

var environment = process.env.NODE_ENV || 'development';
var config = options[environment];
module.exports = require('knex')(config);
*/
module.exports = {
    client: 'mysql',
    connection: {
        user: 'tutorial_root',
        password: 'tutorial_root',
        database: 'knex_video'
    }
}