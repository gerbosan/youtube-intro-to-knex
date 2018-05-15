import { Request, Response, NextFunction } from 'express';
const knex = require('knex')(require('../../conf/knexfile.js'));
const controller = {
    listar: (req: Request, res: Response, next: NextFunction) => {
        knex.select()
            .from('todos')
            .then( todos => {
                res.send(todos);
            })
    },

    filtrar: (req: Request, res: Response, next: NextFunction) => {
        const user_id: number = req.params.id;
        knex.from('todos')
            .innerJoin('users', 'todos.user_id', 'users.id')
            .where('todos.user_id', user_id)
            .then(data => {
                res.send(data);
            });
    },

    filtrar_2: (req: Request, res: Response, next: NextFunction) => {
        const todo_id: number = req.params.id;
        knex.select()
            .from('todos')
            .where('id', todo_id)
            .then( todos => {
                res.send(todos);
            });
    },

    nuevo: (req:Request, res: Response, next: NextFunction) => {
        const title:string = req.body.title;
        const user_id:number = req.body.user_id;

        knex('todos').insert({ title, user_id })
            .then(() => {
                knex.select()
                    .from('todos')
                    .then((todos) => {
                        res.send(todos);
                    });
            });
    },

    editar: (req: Request, res: Response, next: NextFunction) => {
        const title: string = req.body.title;
        const completed: boolean = req.body.completed;        
        const todo_id: number = req.params.id;

        knex('todos')
            .where('id', todo_id)
            .update({ title, completed })
            .then(() => {
                knex.select()
                    .from('todos')
                    .then((todos) => {
                        res.send(todos);
                    });
            });
    },

    borrar: (req: Request, res: Response, next: NextFunction) => {
        const todo_id: number = req.params.id;
        knex('todos')
            .where('id', todo_id)
            .del()
            .then(() => {
                knex.select()
                    .from('todos')
                    .then((todos) => {
                        res.send(todos);
                    });
            });
    }
};
export { controller };