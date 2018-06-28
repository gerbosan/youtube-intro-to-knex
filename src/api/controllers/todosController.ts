import { Request, Response, NextFunction } from "express";
const knex = require("knex")(require("../../conf/knexfile.js"));

const controller = {
  listar: async (req: Request, res: Response, next: NextFunction) => {
    // const user_id = proceso para obtener user_id
    await knex
      .column(
        "todos.id",
        "todos.title",
        "todos.completed",
        "todos.updated_at",
        "todos.user_id",
        "users.name"
      )
      .from("todos")
      .innerJoin("users", "todos.user_id", "users.id")
      // .where('todos.user_id', user_id) solo mostrar TODOs de user_id
      .orderBy("todos.updated_at", "desc")
      .then(data => {
        if (data.length >= 1) {
          res.status(200).json(listResults(data));
        } else {
          res.status(404).json({
            message: "No entries found"
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },

  nuevo: async (req: Request, res: Response, next: NextFunction) => {
    const todoTitle: HTMLInputElement = req.body.todoTitle;
    // user_id se debe obtener de JSToken se necesita un servicio que saque el user_id del token
    const userId: HTMLInputElement = req.body.userId;

    await knex("todos")
      .insert({ title: todoTitle, user_id: userId })
      .then(async () => {
        await knex
          .column(
            "todos.id",
            "todos.title",
            "todos.completed",
            "todos.updated_at",
            "todos.user_id"
            // 'users.name'
          )
          .from("todos")
          // .innerJoin('users', 'todos.user_id', 'users.id')
          .orderBy("todos.updated_at", "desc")
          .then(data => {
            if (data.length >= 1) {
              res.status(201).json(listResults(data));
            } else {
              res.status(404).json({ message: "No entries found" });
            }
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  },

  editar: async (req: Request, res: Response, next: NextFunction) => {
    const todoTitle: HTMLInputElement = req.body.todoTitle;
    const todoCompleted: HTMLInputElement = req.body.todoCompleted;
    // Indicador de id de todo se debe transmitir de otra manera
    const todoId: number = req.params.todoId;

    await knex("todos")
      .where("id", todoId)
      .update({ title: todoTitle, completed: todoCompleted })
      .then(async () => {
        await knex
          .column(
            "todos.id",
            "todos.title",
            "todos.completed",
            "todos.updated_at",
            "todos.user_id",
            "users.name"
          )
          .from("todos")
          .innerJoin("users", "todos.user_id", "users.id")
          .then(data => {
            if (data.length >= 1) {
              res.status(201).json(listResults(data));
            } else {
              res.status(404).json({ message: "No entries found" });
            }
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  },
  borrar: async (req: Request, res: Response, next: NextFunction) => {
    const todoId: HTMLInputElement = req.params.todoId;
    await knex("todos")
      .where("id", todoId)
      .del()
      .then(async () => {
        await knex
          .column(
            "todos.id",
            "todos.title",
            "todos.completed",
            "todos.updated_at",
            "todos.user_id",
            "users.name"
          )
          .from("todos")
          .innerJoin("users", "todos.user_id", "users.id")
          .orderBy("todos.updated_at", "desc")
          .then(data => {
            if (data.length >= 1) {
              res.status(201).json(listResults(data));
            } else {
              res.status(404).json({ message: "No entries found" });
            }
          });
      })
      .catch(err => {
        console.log(err);
        res.status(505).json({ error: err });
      });
  },
  filtrar: async (req: Request, res: Response, next: NextFunction) => {
    // Opción para ADM. Filtrar TODOS según userID
    const userId: HTMLInputElement = req.params.userId;
    await knex
      .column(
        "todos.id",
        "todos.title",
        "todos.completed",
        "todos.updated_at",
        "todos.user_id",
        "users.name"
      )
      .from("todos")
      .innerJoin("users", "todos.user_id", "users.id")
      .where("todos.user_id", userId)
      .orderBy("updated_at", "desc")
      .then(data => {
        if (data.length >= 1) {
          res.status(200).json(listResults(data));
        } else {
          res.status(404).json({
            message: "No entries found"
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }
};

function listResults(info) {
  const response = {
    count: info.length,
    todos: info.map(todo => {
      return {
        todo_id: todo["id"],
        todo_title: todo["title"],
        todo_completed: todo["completed"],
        todo_updatedAt: todo["updated_at"],
        todo_userId: todo["user_id"],
        user_name: todo["name"],
        request: {
          type: "GET",
          url: "/todos/" + todo["id"]
        }
      };
    })
  };
  return response;
}

export { controller };
