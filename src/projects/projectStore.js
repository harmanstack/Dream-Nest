const STORAGE_KEY = 'dreamnest-projects';

export function readProjects() {
  const storedProjects = window.localStorage.getItem(STORAGE_KEY);
  if (storedProjects === null) return [];

  let projects;
  try {
    projects = JSON.parse(storedProjects);
  } catch (error) {
    throw new Error('Your saved projects could not be read.', { cause: error });
  }

  if (
    !Array.isArray(projects) ||
    projects.some(
      (project) =>
        !project ||
        typeof project.id !== 'string' ||
        typeof project.name !== 'string' ||
        typeof project.createdAt !== 'string' ||
        typeof project.updatedAt !== 'string' ||
        (project.elements !== undefined && !Array.isArray(project.elements))
    )
  ) {
    throw new Error('Your saved projects have an invalid format.');
  }

  return projects;
}

export function readProject(projectId) {
  const project = readProjects().find((item) => item.id === projectId);
  if (!project) {
    throw new Error('This project could not be found. It may have been deleted.');
  }
  return project;
}

function writeProjects(projects) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export function createProject(name) {
  const projects = readProjects();
  const now = new Date().toISOString();
  const project = {
    id: window.crypto?.randomUUID?.() || `project-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    name: name.trim(),
    createdAt: now,
    updatedAt: now,
  };

  writeProjects([project, ...projects]);
  return project;
}

export function deleteProjects(projectIds) {
  const idsToDelete = new Set(projectIds);
  writeProjects(readProjects().filter((project) => !idsToDelete.has(project.id)));
}

export function saveProjectPlan(projectId, elements) {
  const projects = readProjects();
  const projectIndex = projects.findIndex((project) => project.id === projectId);
  if (projectIndex === -1) {
    throw new Error('This project no longer exists. Return to Projects and open it again.');
  }

  const updatedProjects = [...projects];
  updatedProjects[projectIndex] = {
    ...updatedProjects[projectIndex],
    elements,
    updatedAt: new Date().toISOString(),
  };
  writeProjects(updatedProjects);
}
