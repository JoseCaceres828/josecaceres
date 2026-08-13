import * as taskService from '../services/task.service.js';
import { successResponse } from '../utils/response.js';

export const getAllTasks = async (req, res) => {
  const tasks = await taskService.findAllTasks(req.project.id);

  return successResponse(res, tasks, 'Tareas obtenidas');
};

export const createTask = async (req, res) => {
  const task = await taskService.createTask({
    ...req.body,
    projectId: req.project.id,
  });

  return successResponse(res, task, 'Tarea creada', 201);
};

export const getTask = async (req, res) => {
  const task = await taskService.getTask(req.params.id, req.project.id);

  return successResponse(res, task, 'Tarea obtenida');
};

export const updateTask = async (req, res) => {
  const { title, description } = req.body;
  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;

  const task = await taskService.updateTask(
    req.params.id,
    req.project.id,
    updateData
  );

  return successResponse(res, task, 'Tarea actualizada');
};

export const deleteTask = async (req, res) => {
  await taskService.deleteTask(req.params.id, req.project.id);

  return successResponse(res, null, 'Tarea eliminada');
};

export const completeTask = async (req, res) => {
  const task = await taskService.completeTask(req.params.id, req.project.id);

  return successResponse(res, task, 'Tarea completada');
};

// trabajo de investigación
////trabajo de investigación obtener un proyecto con toda sus tareas

//const taskService = require(module, '../services/task.service.js');

const getProjectTasks = async (req, res) => {
  try {
    const { projectId } = req.params;

    // Pasa la petición a la capa de servicio
    const result = await taskService.getTasksByProject(projectId, req.query);

    return res.status(200).json(result);
  } catch (error) {
    // Gestión centralizada de errores (puedes usar un middleware de errores)
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProjectTasks
};