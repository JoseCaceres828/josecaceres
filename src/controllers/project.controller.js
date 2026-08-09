import * as projectService from '../services/project.service.js';
import { successResponse } from '../utils/response.js';

export const getAllProjects = async (req, res) => {
  const projects = await projectService.findAllProjects(req.user.id);

  return successResponse(res, projects, 'proyectos obtenidos');
};

export const createProject = async (req, res) => {
  const project = await projectService.createProject({
    ...req.body,
    userId: req.user.id,
  });

  return successResponse(res, project, 'proyecto creado', 201);
};

export const getProject = async (req, res) => {
  const project = await projectService.getProject(req.params.id, req.user.id);

  return successResponse(res, project, 'Proyecto obtenido');
};

export const updateProject = async (req, res) => {
  const { name, description, status } = req.body;
  const updateData = {};

  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (status !== undefined) updateData.status = status;

  const project = await projectService.updateProject(
    req.params.id,
    req.user.id,
    updateData
  );

  return successResponse(res, project, 'Proyecto actualizado');
};

export const deleteProject = async (req, res) => {
  await projectService.deleteProject(req.params.id, req.user.id);

  return successResponse(res, null, 'proyecto eliminado');
};

export const completeProject = async (req, res) => {
  const project = await projectService.completeProject(req.params.id, req.user.id);

  return successResponse(res, project, 'proyecto completado');
};
