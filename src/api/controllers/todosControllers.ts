import { Request, Response, NextFunction } from 'express';
const knex = require('knex')(require('../../conf/knexfile.js'));
const controller = {
    listar: async (req: Request, res: Response, next: NextFunction) => {
        /*
        knex.select()
            .from('todos')
            .then( todos => {
                res.send(todos);
            })*/
        knex.column('todos.id', 'todos.title', 'todos.completed', 'todos.updated_at', 'todos.user_id', 'users.name', 'users.email')
            .from('todos')
            .innerJoin('users', 'todos.user_id', 'users.id')
            .then(data => {
                // res.send(data);
                /*
                const response = {
                    count: data.length,
                    todos: data.map(todo => {
                        return {
                            todo_id: todo['id'],
                            todo_title: todo['title'],
                            todo_completed: todo['completed'],
                            todo_updated: todo['updated_at'],
                            todo_userId: todo['user_id'],
                            todo_userName: todo['name'],
                            todo_userEmail: todo['email'],
                            request: {
                                type: 'GET',
                                url: '/todos/' + todo['id']
                            }
                        }
                    })
                }*/

                if(data.length >=1) {
                    res
                        .status(200)
                        .json(listResults(data));
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'No entries found'
                        });
                }
            })
            .catch(err => {
                console.log(err);
                res
                    .status(500)
                    .json({
                        error: err
                    })
            })
    },

    filtrar: async (req: Request, res: Response, next: NextFunction) => {
        const user_id: number = req.params.id;
        knex.column('todos.id', 'todos.title', 'todos.completed', 'todos.updated_at', 'todos.user_id', 'users.name', 'users.email')
            .from('todos')
            .innerJoin('users', 'todos.user_id', 'users.id')
            .where('todos.user_id', user_id)
            .then(data => {
                // res.send(data);
                /*
                const response = {
                    count: data.length,
                    todos: data.map(todo => {
                        return {
                            todo_id: todo['id'],
                            todo_title: todo['title'],
                            todo_completed: todo['completed'],
                            todo_updated: todo['updated_at'],
                            todo_userId: todo['user_id'],
                            todo_userName: todo['name'],
                            todo_userEmail: todo['email'],
                            request: {
                                type: 'GET',
                                url: '/todos/' + todo['id']
                            }
                        }
                    })
                }*/
                if(data.length >= 1) {
                    res
                        .status(200)
                        .json(listResults(data));
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'No entries found' 
                        });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            })
    },

    filtrar_2: async (req: Request, res: Response, next: NextFunction) => {
        const todo_id: number = req.params.id;
        knex.column('todos.id', 'todos.title', 'todos.completed', 'todos.updated_at', 'todos.user_id', 'users.name', 'users.email')
            .from('todos')
            .innerJoin('users', 'todos.user_id', 'users.id')
            .where('todos.id', todo_id)
            .then( data => {
                // res.send(data);
                /*
                const response = {
                    count: data.length,
                    todos: data.map(todo => {
                        return {
                            todo_id: todo['id'],
                            todo_title: todo['title'],
                            todo_completed: todo['completed'],
                            todo_updated: todo['updated_at'],
                            todo_userId: todo['user_id'],
                            todo_userName: todo['name'],
                            todo_userEmail: todo['email'],
                            request: {
                                type: 'GET',
                                url: '/todos/' + todo['id']
                            }
                        }
                    })
                }*/
                if(data.length >= 1) {
                    res.status(200).json(listResults(data));
                } else {
                    res.status(404).json({ message: 'No entries found' });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            })
    },

    nuevo: async (req:Request, res: Response, next: NextFunction) => {
        const title:string = req.body.title;
        const user_id:number = req.body.user_id;

        knex('todos').insert({ title, user_id })
            .then(() => {
                /* Devuelve lista de TODOS
                knex.select()
                    .from('todos')
                    .then((todos) => {
                        res.send(todos);
                    });
                */
               knex.column('todos.id', 'todos.title', 'todos.completed', 'todos.updated_at', 'todos.user_id', 'users.name', 'users.email')
                    .from('todos')
                    .innerJoin('users', 'todos.user_id', 'users.id')
                    .then(data => {
                        if(data.length >= 1) {
                            res.status(201).json(listResults(data));
                        } else {
                            res.status(404).json({ message: 'No entries found' });
                        }
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err})
                
            })
    },

    editar: (req: Request, res: Response, next: NextFunction) => {
        const title: string = req.body.title;
        const completed: boolean = req.body.completed;
        const todo_id: number = req.params.id;

        knex('todos')
            .where('id', todo_id)
            .update({ title, completed })
            .then(() => {
                /*
                knex.select()
                    .from('todos')
                    .then((todos) => {
                        res.send(todos);
                    });
                */
               knex.column('todos.id', 'todos.title', 'todos.completed', 'todos.updated_at', 'todos.user_id', 'users.name', 'users.email')
                   .from('todos')
                   .innerJoin('users', 'todos.user_id', 'users.id')
                   .then(data => {
                       if(data.length >= 1) {
                           res.status(200).json(listResults(data));
                       } else {
                           res.status(404).json({message: 'No entries found'});
                       }
                   })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
                
            })
    },

    borrar: (req: Request, res: Response, next: NextFunction) => {
        const todo_id: number = req.params.id;
        knex('todos')
            .where('id', todo_id)
            .del()
            .then(() => {
                /*
                knex.select()
                    .from('todos')
                    .then((todos) => {
                        res.send(todos);
                    });
                */
               knex.column('todos.id', 'todos.title', 'todos.completed', 'todos.updated_at', 'todos.user_id', 'users.name', 'users.email')
                    .from('todos')
                    .innerJoin('users', 'todos.user_id', 'users.id')
                    .then(data => {
                        if(data.length >= 1) {
                            res.status(200).json(listResults(data));
                        } else {
                            res.status(404).json({message: 'No entries found'});
                        }
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
                
            });
    }
};

function listResults(info) {
    const response = {
        count: info.length,
        todos: info.map(todo => {
            return {
                todo_id: todo['id'],
                todo_title: todo['title'],
                todo_completed: todo['completed'],
                todo_updated: todo['updated_at'],
                todo_userId: todo['user_id'],
                todo_userName: todo['name'],
                todo_userEmail: todo['email'],
                request: {
                    type: 'GET',
                    url: '/todos/' + todo['id']
                }
            }
        })
    }
    return response;
}

export { controller };