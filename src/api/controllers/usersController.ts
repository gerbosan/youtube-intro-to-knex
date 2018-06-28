import { Request, Response, NextFunction } from "express";
import bcrypt = require("bcryptjs");
const knex = require("knex")(require("../../conf/knexfile.js"));

import { passProtect, createToken } from "../middleware/tokenService";
/**
 * Rutas existentes
 * 
 * listar: Solo para administrador, muestra la lista de usuarios registrados en el sistema.
 *        GET: /users
 *
 * detalle: Para todos, muestra email, nombre, resumen de usuario.
 *        GET: /users/:userId
 *
 * modificar: Para todos, solo el usuario puede modificar sus datos.
 *        PUT: /users/:userId
 *
 * borrar: Para todos, para "eliminar" cuenta en el sistema. Solo el Administrador puede eliminar cuentas de listar.
 *        Se cambia el rol a 0 (cero) para indicar que el registro no existe.
 *        DELETE: /users/:userId
 *
 * signup: Para todos, permite el registro en el sistema, no se permite email repetidos. Verificar el rol.
 *         Si el rol es 0(cero), se reescribe a 1(uno) para que sea usuario.
 *        POST: /new-users
 *
 * login: Para permitir el acceso al sistema. Si ya se ha hecho login (existe webtoken),
 *        se debe mostrar lista de /todos del usuario. Se verifica el rol del usuario, si es 0(cero) no se debe permitir el acceso.
 *        POST: /
 *
 *
 * funcion listResults: Procesa el resultado de knex y lo pasa como JSON, se usa en listar, detalle, modificar
 */
const controller = {
  listar: async (req: Request, res: Response, next: NextFunction) => {
    // opción solo activa para ADM, lista a todos los usuarios
    await knex
      .column(
        "users.id",
        "users.name",
        "users.resume",
        "users.active",
        "users.login_id",
        "login.email",
        "login.role",
        "login.created_at"
      )
      .from("users")
      .innerJoin("login", "users.login_id", "login.id")
      .where("users.active", true)
      .orderBy("login.created_at", "desc")
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

  detalle: async (req: Request, res: Response, next: NextFunction) => {
    const userId: number = req.params.userId;
    // hacer comprobación si userId, pertenece al usuario que consulta o si el rol es de ADM.
    /*
    const mirrorId: number = processToken(1);
    if (userId === mirrorId) {
      console.log("Petición de detalle de usuario correcta");
    } else {
      console.log("Petición de detalle incorrecta");
    }
*/
    await knex
      .column(
        "users.id",
        "users.name",
        "users.resume",
        "users.login_id",
        "users.active",
        "login.email",
        "login.role",
        "login.created_at"
      )
      .from("users")
      .innerJoin("login", "users.login_id", "login.id")
      .where("users.id", userId)
      .where("users.active", true)
      .orderBy("login.created_at", "desc")
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

  modificar: async (req: Request, res: Response, next: NextFunction) => {
    // no se puede modificar el email. Se puede modificar tablas login (password) y users (name, resume)
    const userName: string = req.body.userName;
    const userResume: string = req.body.userResume;
    // const userPass: HTMLInputElement = req.body.userPassword; User otro formulario para cambiar dato

    const userId: number = req.params.userId;

    await knex("users")
      .where("users.id", userId)
      .update({
        name: userName,
        resume: userResume
      })
      .then(()=> {
        res.status(201).json({
          message: "Datos actualizados"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  },

  borrar: async (req: Request, res: Response, next: NextFunction) => {
    // Verificar user_id y rol. Usuario normal solo puede borrar su cuenta. Luego de borrar, se hace logout.
    const userId: number = req.params.userId;

    await knex("login")
      .where("login.id", userId)
      .update({ role: 0 })
      .then(async () => {
        // Al borrarse la cuenta de un usuario, automáticamente hace logout. Lista funcional para ADM cuando borra usuarios.
        await knex("users")
          .where("users.login_id", userId)
          .update({ active: false });
        res.status(201).json({
          message: "Usuario borrado"
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  },

  signup: async (req: Request, res: Response, next: NextFunction) => {
    // Usuario registra su email y password (tabla login), luego modifica para editar Nombre y Resumen. Aplicar JSWebToken para guardar pass
    const userEmail: HTMLInputElement = req.body.userEmail;
    const userPass: HTMLInputElement = req.body.userPass;
    const userRole: number = 1;

    if (verifyEmail(userEmail)) {
      // Revisar si el email está disponible.
      const emailOk = await knex("login").where("email", userEmail); // retorna consulta si email existe en tabla.
      const roleCero = await knex("login")
        .where("email", userEmail)
        .where("role", ">=", 1); // retorna valor si email existe y registro tiene role valor UNO (activo)
      console.log("Registro de email existe", emailOk);
      console.log("Id de email marcado borrado", roleCero);
      if (emailOk.length == 0 || roleCero.length < 1) {
        // console.log("Email does not exist: ", emailOk);
        await knex("login")
          .insert({
            email: userEmail,
            password: passProtect(userPass),
            role: userRole
          })
          .returning("id") // devuelve el id en consola
          .then(async id => {
            await knex("users")
              .insert({
                login_id: id,
                name: userEmail
              })
              .then(result => {
                // console.log(result);
                res.status(201).json({
                  message: "User created:",
                  result
                });
              });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err
            });
          });
      } else {
        // console.log("Email exists: ", emailOk);
        res.status(409).json({ message: "Email already registered." });
      }
    } else {
      res.status(401).json({
        message: "Malformed email"
      });
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    const userEmail: string = req.body.userEmail;
    const userPass: string = req.body.userPass;
    // revisión de email y si password corresponde con token.

    if (verifyEmail(userEmail)) {
      const accesoOk = await knex("login")
        .where("email", userEmail)
        .andWhere("role", ">=", 1);
      // console.log("This is the result:", accesoOk);
      if (accesoOk.length > 0) {
        bcrypt.compare(
          userPass,
          accesoOk[0]["password"],
          (err: Error, result: boolean) => {
            console.log("Contenido funciona");
            if (result) {
              // Result guarda la respuesta del proceso, si comparación funciona o si fue errónea la clave
              // console.log("Password corresponde", result);
              const user = {
                // Que es relevante para payload
                userId: accesoOk[0]["id"],
                userEmail: accesoOk[0]["email"],
                userRole: accesoOk[0]["role"]
              };
              console.log("Revisando contenido de user:", user);
              const token = createToken(user);
              console.log("Token created:", token);
              res.status(200).json({
                message: "Authorization processed.",
                token
              });
            } else {
              console.log("Password no corresponde:", result);
              res.status(401).json({
                message: "Authorization failed"
              });
            }
            if (err != null) {
              // err tiene valores si ocurren errores en el procesamiento de datos
              console.log("Problemas en el procesamiento de la clave:", err);
            }
          }
        );
      } else {
        res.status(401).json({
          message: "Authorization failed"
        });
      }
    } else {
      res.status(401).json({
        message: "Malformed email"
      });
    }
  },

  logout: (req:Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      auth: false,
      token: null
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
        user_resume: user["resume"],
        user_loginId: user["login_id"],
        login_email: user["email"],
        login_role: user["role"],
        login_createdAt: user["created_at"],
        request: {
          type: "GET",
          url: "/users/" + user["id"]
        }
      };
    })
  };
  return response;
}

function verifyEmail(email) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

export { controller };
