import Task from '../entities/task.entity.js';
//impotamos
import Project from '../entities/project.entity.js';
import User from '../entities/user.entity.js';

export const create = async (data) => {
  return await Task.create(data);
};

export const findAllByUser = async (projectId) => {
  return await Task.findAll({
    where: {
      projectId,
    },
    attributes: ['id', 'title', 'description', 'completed'],
    order: [['createdAt', 'DESC']],
  });
};

export const findById = async (id, projectId) => {
  return await Task.findOne({
    where: {
      id,
      projectId,
    },
    attributes: ['id', 'title', 'description', 'completed'],
  });
};

export const update = async (task, data) => {
  return await task.update(data);
};

export const remove = async (task) => {
  return await task.destroy();
};

//tarea de investigación 
// paginacion para las tareas

//const { Project, User } = require(module, '../models');

const findTasksByProjectPaginated = async (projectId, limit, offset) => {
  return await Task.findAndCountAll({
    where: { projectId },
    limit,
    offset,
    attributes: ['id', 'title', 'description'], // Atributos específicos de la tarea
    include: [
      {
        model: Project,
        as: 'project', // Alias de la asociación Project -> Task
        attributes: ['id', 'name'],
        include: [
          {
            model: User,
            as: 'user', // Alias de la asociación User -> Project
            attributes: ['id', 'name', 'email']
          }
        ]
      }
    ]
  });
};

module.exports = {
  findTasksByProjectPaginated
};