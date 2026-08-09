
//se llama project.repository.js

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