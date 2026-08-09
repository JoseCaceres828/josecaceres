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
