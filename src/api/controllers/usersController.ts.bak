import { Request, Response, NextFunction } from "express";
const knex = require("knex")(require("../../conf/knexfile.js"));
const controller = {
  // Listar todos los usuarios disponibles para el Administrador
  listar: async (req: Request, res: Response, next: NextFunction) => {
    await knex
      .column(
        "users.id",
        "users.name",
        "users.email",
        "users.created_at"
      )
      .from("users")
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
  // Listar los datos de un usuario en específico para admin y usuario
  detalle: async (req: Request, res: Response, next: NextFunction) => {
    const userId: HTMLInputElement = req.params.userId;
    await knex
      .column(
          "users.id", 
          "users.name", 
          "users.email", 
          "users.created_at")
      .from("users")
      .where("users.id", userId)
      .then(data => {
          if(data.length >= 1) {
              res.status(200).json(listResults(data));
          } else {
              res.status(404).json({ message: 'No entries found' });
          }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  },
  // Registro de usuario nuevo
  signup: async (req: Request, res: Response, next: NextFunction) => {
      const userName: HTMLInputElement = req.body.userName;
      const userEmail: HTMLInputElement = req.body.userEmail;

      await knex("users")
        .insert({ userName, userEmail })
        .then(next())
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
  },
  // Para pantalla de Login, acceso al sistema
  login: async (req: Request, res: Response, next: NextFunction) => {
      const userName: HTMLInputElement = req.body.userName;
      const userEmail: HTMLInputElement = req.body.userEmail;

      await knex("users")
  },
  // Para modificar algunos datos de tabla users y login: datos de usuario y contraseña
  modificar: async (req: Request, res: Response, next: NextFunction) => {
      const userName: HTMLInputElement = req.body.userName;
      const userEmail: HTMLInputElement = req.body.userEmail;
      const userId: number = req.params.userId;

      await knex('users')
        .where('users.id', userId)
        .update({ userName, userEmail })
        .then(async () => {
            await knex
                .column(
                    "users.id", 
                    "users.name", 
                    "users.email", 
                    "users.created_at"
                )
                .from("users")
                .then(data => {
                    if(data.length >= 1) {
                        res.status(201).json(listResults(data));
                    } else {
                        res.status(404).json({ message: "No entries found" });
                    }
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
  },
  // Para marcar usuario y sus todos como no accesibles.
  borrar: async (req: Request, res: Response, next: NextFunction) => {
      const usersId: HTMLInputElement = req.params.userId;
      await knex('users')
        .where('users.id', usersId)
        .del()
        .then(async () => {
            await knex
                .column(
                    "users.id", 
                    "users.name", 
                    "users.email", 
                    "users.created_at"
                )
                .from("users")
                .then(data => {
                    if(data.length >= 1) {
                        res.status(201).json(listResults(data));
                    } else {
                        res.status(404).json( { message: 'No entries found' });
                    }
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        })
  }
};

function listResults(info) {
  const response = {
    count: info.length,
    users: info.map(user => {
      return {
        user_id: user["id"],
        user_name: user["name"],
        user_email: user["email"],
        user_createdAt: user["created_at"],
        request: {
          type: "GET",
          url: "/users/" + user["id"]
        }
      };
    })
  };
  return response;
}

export { controller };
