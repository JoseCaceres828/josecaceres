import * as repository from '../repositories/task.repository.js';
import { AppError } from '../utils/AppError.js';

export const createTask = async (data) => {
  return await repository.create(data);
};

export const findAllTasks = async (projectId) => {
  return await repository.findAllByProject(projectId);
};

export const getTask = async (id, projectId) => {
  const task = await repository.findById(id, projectId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  return task;
};

export const updateTask = async (id, projectId, data) => {
  const task = await repository.findById(id, projectId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  return await repository.update(task, data);
};

export const deleteTask = async (id, projectId) => {
  const task = await repository.findById(id, projectId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  await repository.remove(task);
};

export const completeTask = async (id, projectId) => {
  const task = await repository.findById(id, projectId);

  if (!task) {
    throw new AppError('Tarea no encontrada', 404);
  }

  return await repository.update(task, {
    completed: true,
  });
};


// trabajo de investigación
//paginacion para las tareas

const taskRepository = require(module ,'../repositories/task.repository.js');//se agregp model

const getTasksByProject = async (projectId, queryParams) => {
  // 1. Validar y parsear los query params con valores por defecto
  const page = parseInt(queryParams.page, 10) || 1;
  const limit = parseInt(queryParams.limit, 10) || 10;

  // 2. Aplicar Fórmula: offset = (page - 1) * limit
  const offset = (page - 1) * limit;

  // 3. Llamar al repositorio para obtener total e ítems
  const { count, rows } = await taskRepository.findTasksByProjectPaginated(projectId, limit, offset);

  // 4. Cálculo de totalPages: Math.ceil(totalItems / limit)
  const totalPages = Math.ceil(count / limit);

  // 5. Retornar la estructura final de datos y paginación
  return {
    tasks: rows,
    pagination: {
      totalItems: count,
      totalPages,
      currentPage: page,
      limit
    }
  };
};

module.exports = {
  getTasksByProject
};