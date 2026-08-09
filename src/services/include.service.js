/*
import * as repository from '../repositories/task.repository.js';
import { AppError } from '../utils/AppError.js';


const proyecto = await Project.findByPK(projectId, {
    include: [{
        model: Task,

        as: 'task',

        attributes:['id', 'title', 'status']
    }]
});
*/

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
  async getProjectDetails(projectId) {
    const project = await projectRepository.findProjectWithTasks(projectId);
    
    if (!project) {
      throw new Error('Proyecto no encontrado'); // Regla de negocio
    }

    return project;
  }
  
}

module.exports = new ProjectService();