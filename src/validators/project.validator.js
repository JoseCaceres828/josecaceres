import { body } from 'express-validator';

export const createProjectValidator = [
  body('name')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .isLength({ max: 255 })
    .withMessage('El nombre debe tener menos de 255 caracteres'),

  body('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto'),

    body('status')
    .optional()
    .isString()
    .withMessage('El estado debe ser un texto'),
];

export const updateProjectValidator = [
  body('name')
    .optional()
    .notEmpty()
    .withMessage('El nombre no puede estar vacío')
    .isLength({ max: 255 })
    .withMessage('El nombre debe tener menos de 255 caracteres'),

  body('description')
    .optional()
    .isString()
    .withMessage('La descripción debe ser un texto'),
    
    body('status')
    .optional()
    .isString()
    .withMessage('El estado debe ser un texto'),
];
