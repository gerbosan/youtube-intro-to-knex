import express = require("express");
const router = express.Router();

import { controller as ctrl } from "../controllers/usersController";

// Listar todos los usuarios
router.get("/users", ctrl.listar);

// Listar detalles de usuarios
router.get("/users/:userId", ctrl.detalle);

// Crear usuario
router.post("/new-users", ctrl.signup);

// Login de usuario
router.post("/", ctrl.login);

// Modificar datos de usuario
router.put("/users/:userId", ctrl.modificar);

// Marcar usuario y sus ToDo para borrar
router.delete("/users/:userId", ctrl.borrar);

export { router };
