import { param } from 'express-validator';

export const uuidParamValidator = [
  param('id').isUUID().withMessage('Formato de ID inválido'),
];
