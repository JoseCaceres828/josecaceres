import { body } from 'express-validator';

export const createProjectValidator = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ max: 255 })
    .withMessage('El nombre debe tener menos de 255 caracteres'),

  body('description')
  .notEmpty()
  .withMessage('La descripcion es requerido')
  .isString()
  .withMessage('La descripción debe ser un texto'),

   body('status')
    .notEmpty()
    .withMessage('El estado debe estar activo')
    .isLength({ max: 50 })
    .withMessage('El estado debe tener menos de 50 caracteres'),
];

export const updateProjectValidator = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('El nombre no puede estar vacío')
    .isLength({ max: 255 })
    .withMessage('El nombre debe tener menos de 255 caracteres'),

  body('description')
  .notEmpty()
  .withMessage('La descripcion es requerido')
  .isString()
  .withMessage('La descripción debe ser un texto'),

  body('status')
    .notEmpty()
    .withMessage('El estado debe estar activo')
    .isLength({ max: 50 })
    .withMessage('El estado debe tener menos de 50 caracteres'),
];
