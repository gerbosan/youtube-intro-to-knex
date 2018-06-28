import express = require('express');

const router = express.Router();

import { controller as ctrl } from '../controllers/todosController';

// listar todos
router.get('/', ctrl.listar);

// añadir todo
router.post('/', ctrl.nuevo);

// editar todo
router.put('/:todoId', ctrl.editar);

// borrar todo
router.delete('/:todoId', ctrl.borrar);

// listar por user_id
router.get('/:userId', ctrl.filtrar);

/*
// listar todos filtrado por usuario
router.get('/todos-of-user/:id', ctrl.filtrar);

// listar todos filtrado por id de todo
router.get('/:id', ctrl.filtrar_2);
*/
export { router };