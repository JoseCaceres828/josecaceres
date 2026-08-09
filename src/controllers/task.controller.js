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
