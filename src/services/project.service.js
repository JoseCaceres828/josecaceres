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

//se llama project.service.js

const projectRepository = require('../repositories/project.repository');

class ProjectService {
  // Lógica para paginar tareas
  async getTasksPaginated(queryParams) {
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    
    // Fórmula matemática requerida
    const offset = (page - 1) * limit;

    // Llamada al repositorio
    const { count, rows } = await projectRepository.findPaginatedTasks({ offset, limit });

    // Cálculo solicitado
    const totalPages = Math.ceil(count / limit);

    return {
      data: rows,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: page,
        limit
      }
    };
  }

  // Lógica para obtener el proyecto con sus relaciones
  //segunda pregunta
   // Implementación del Obtener Proyecto con Tareas (Include)
  async getProjectDetails(projectId) {
    const project = await projectRepository.findProjectWithTasks(projectId);
    
    if (!project) {
      throw new Error('Proyecto no encontrado'); // Regla de negocio
    }

    return project;
  }
  // otro metodo
  // Implementación del Obtener Proyecto con Tareas (Include)
  async findProjectWithTasks(projectId) {
    return await Project.findByPk(projectId, {
      include: {
        model: Task,
        as: 'tasks', // Alias de la asociación
        attributes: ['id', 'title', 'status'] // Atributos específicos
      }
    });
  }

   
}

module.exports = new ProjectService();

