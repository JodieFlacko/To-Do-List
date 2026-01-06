import { createProjectElement } from "./createComponents";
import { getProjects } from "./projectModel";
// sidebarView.js
export const renderSidebar = () => {
  const projects = getProjects();
  const container = document.querySelector('.AppSidebarGroupsItem.lists');
  container.innerHTML = '';
  
  projects.forEach(project => {
      const element = createProjectElement();
      element.querySelector(".appSidebarGroupsItems_item_categoryTitle").textContent = project.name;
      container.appendChild(element);
  });
};