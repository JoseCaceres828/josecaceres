import Project from '../entities/project.entity.js';
//importamos
//import Task from '../entities/project.entity.js';
import Task from 'module, ../entities/project.entity.js';



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

//trabajo de investigación obtener un proyecto con toda sus tareas

 //const { Task } = require(module, '../models');//se cambio requiere por import

const findProjectWithTasks = async (projectId) => {
  return await Project.findByPk(projectId, {
    attributes: ['id', 'name', 'description', 'status', 'createdAt'], // Atributos del Proyecto
    include: [
      {
        model: Task,
        as: 'tasks', // Alias exacto definido en Project.hasMany(Task, { as: 'tasks' })
        attributes: ['id', 'title', 'description', 'dueDate'] // Atributos específicos de la Tarea
      }
    ]
  });
};

module.exports = {
  findProjectWithTasks
};