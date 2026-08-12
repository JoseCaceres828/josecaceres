import * as repository from '../repositories/project.repository.js';
import { AppError } from '../utils/AppError.js';

export const createProject = async (data) => {
  return await repository.create(data);
};

export const findAllProjects = async (userId) => {
  return await repository.findAllByUser(userId);
};

export const getProject = async (id, userId) => {
  const project = await repository.findById(id, userId);

  if (!project) {
    throw new AppError('proyecto no encontrado', 404);
  }

  return project;
};

export const updateProject = async (id, userId, data) => {
  const project = await repository.findById(id, userId);

  if (!project) {
    throw new AppError('proyecto no encontrado', 404);
  }

  return await repository.update(project, data);
};

export const deleteProject = async (id, userId) => {
  const project = await repository.findById(id, userId);

  if (!project) {
    throw new AppError('proyecto no encontrado', 404);
  }

  await repository.remove(project);
};

export const completeProject = async (id, userId) => {
  const project = await repository.findById(id, userId);

  if (!project) {
    throw new AppError('proyecto no encontrada', 404);
  }

  return await repository.update(project, {
    completed: true,
  });
};


//trabajo de investigacion

//trabajo de investigación obtener un proyecto con toda sus tareas

const projectRepository = require('../repositories/project.repository');

const getProjectAndItsTasks = async (projectId) => {
  const project = await projectRepository.findProjectWithTasks(projectId);

  // Lógica de negocio: Validar existencia del recurso
  if (!project) {
    const error = new Error('El proyecto solicitado no existe');
    error.statusCode = 404;
    throw error;
  }

  return project;
};

module.exports = {
  getProjectAndItsTasks
};