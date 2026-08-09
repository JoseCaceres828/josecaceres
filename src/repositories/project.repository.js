import Project from '../entities/project.entity.js';

export const create = async (data) => {
  return await Project.create(data);
};

export const findAllByUser = async (userId) => {
  return await Project.findAll({
    where: {
      userId,
    },
    attributes: ['id', 'name', 'description', 'status'],
    order: [['createdAt', 'DESC']],
  });
};

export const findById = async (id, userId) => {
  return await Project.findOne({
    where: {
      id,
      userId,
    },
    attributes: ['id', 'name', 'description', 'status'],
  });
};

export const update = async (project, data) => {
  return await project.update(data);
};

export const remove = async (project) => {
  return await project.destroy();
};

//trabajo de imvestigación
//implementación de la paginacion e include
const { Project, Task } = require('../models');

class ProjectRepository {
  // Implementación de la Paginación de Tareas
  async findPaginatedTasks({ offset, limit }) {
    return await Task.findAndCountAll({
      limit,
      offset,
      attributes: ['id', 'title', 'status'] // Atributos de la tarea
    });
  }


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

module.exports = new ProjectRepository();

// otro metodo 

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
   
}

module.exports = new ProjectService();
