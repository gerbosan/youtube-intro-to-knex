import express = require('express');

const router = express.Router();

import { controller as ctrl } from '../controllers/todosControllers';

// listar todos
router.get('/', ctrl.listar);

// listar todos filtrado por usuario
router.get('/todos-of-user/:id', ctrl.filtrar);

// listar todos filtrado por id de todo
router.get('/:id', ctrl.filtrar_2);

// añadir todo
router.post('/', ctrl.nuevo);

// editar todo
router.put('/:id', ctrl.editar);

// borrar todo
router.delete('/:id', ctrl.borrar);

export { router };