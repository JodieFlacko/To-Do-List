// projectModel.js
const USER_PROJECTS = [ 
  { id: 'proj_1', name: 'Work Project' },
  { id: 'proj_2', name: 'Grocery List' },
  { id: 'proj_3', name: 'Personal Project' }, 
];

export const getSystemViews = () => SYSTEM_VIEWS
export const getProjects = () => USER_PROJECTS;

export const addProject = (name) => {
  const newProject = { id: crypto.randomUUID(), name };
  USER_PROJECTS.push(newProject);
  console.log(newProject)
  console.log(USER_PROJECTS)
  return newProject;
};

export const deleteProject = (id) => {
  USER_PROJECTS = USER_PROJECTS.filter(p => p.id !== id);
};

export const findProject = (id) => USER_PROJECTS.find(p => p.id === id);