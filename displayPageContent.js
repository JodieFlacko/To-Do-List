import { getProjects } from "./handleProjects";
import { createProjectElement } from "./createComponents";
import { displayTaskElements } from "./displayNotes";
import { displayTaskEditor } from "./displayNoteEditor";

function displayContent(group  = "All My Tasks"){
  // For "group" we refer to a group of tasks, such as tasks of the week, or tasks for a certain project
  const groupTitle = document.querySelector(".tasksContainerHeader h3");
  displayGroupTitle(groupTitle, group);
  displayTaskElements();
  displayTaskEditor();
}

function displayProjects(){
  const myLists = document.querySelector(".AppSidebarGroupsItem.lists");
  myLists.textContent = "";
  const projects = getProjects();

  projects.forEach(project => {
    const element = createProjectElement();
    element.querySelector(".appSidebarGroupsItems_item_categoryTitle").textContent = project;
    myLists.appendChild(element);
  })
}

function displayGroupTitle(title, group){
  title.textContent = group;
}

function displayHomePage(){
  displayContent();
  displayProjects();
}

export { displayHomePage };