import express = require("express");
import { checkToken } from '../middleware/tokenService';

const router = express.Router();

import { controller as ctrl } from "../controllers/usersController";

// Listar todos los usuarios
router.get("/users", checkToken, ctrl.listar);

// Listar detalles de usuarios
router.get("/users/:userId", checkToken, ctrl.detalle);

// Crear usuario
router.post("/new-users", ctrl.signup);

// Login de usuario
router.post("/", ctrl.login);

// Logout de usuario
router.get("/logout", ctrl.logout);

// Modificar datos de usuario
router.put("/users/:userId", checkToken, ctrl.modificar);

// Marcar usuario y sus ToDo para borrar
router.delete("/users/:userId", checkToken, ctrl.borrar);

// Establecer el mecanismo para logout
// router.get('/logout', ctrl.logout);

export { router };
