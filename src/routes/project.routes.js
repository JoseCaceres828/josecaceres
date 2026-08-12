import { Router } from 'express';

import * as projectController from '../controllers/project.controller.js';
import {
  createProjectValidator,
  updateProjectValidator,
} from '../validators/project.validator.js';
import { validate } from '../middlewares/validation.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { uuidParamValidator } from '../validators/common.validator.js';

const router = Router();

/**
 * @swagger
 * /projects:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Obtener todas los proyectos del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de proyectos
 */
router.get('/', authenticate, projectController.getAllProjects);

/**
 * @swagger
 * /projects:
 *   post:
 *     tags:
 *       - Projects
 *     summary: Crear un nuevo proyecto
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Proyecto creado
 */
router.post(
  '/',
  authenticate,
  createProjectValidator,
  validate,
  projectController.createProject
);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     tags:
 *       - Projects
 *     summary: Obtener un proyecto por ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: proyecto encontrado
 *       404:
 *         description: proyecto no encontrado
 */
router.get(
  '/:id',
  authenticate,
  uuidParamValidator,
  validate,
  projectController.getProject
);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     tags:
 *       - Projects
 *     summary: Actualizar un proyecto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string   
 *     responses:
 *       200:
 *         description: proyecto actualizado
 */
router.put(
  '/:id',
  authenticate,
  uuidParamValidator,
  updateProjectValidator,
  validate,
  projectController.updateProject
);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     tags:
 *       - Projects
 *     summary: Eliminar un proyecto
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: proyecto eliminado
 */
router.delete(
  '/:id',
  authenticate,
  uuidParamValidator,
  validate,
  projectController.deleteProject
);


export default router;
