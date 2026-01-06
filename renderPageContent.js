import { getProjects } from "./projectModel.js";
import { renderSidebar } from "./sidebarView.js";
import { displayTaskElements } from "./displayNotes.js";
import { displayTaskEditor } from "./displayNoteEditor.js";

function renderContent(group  = "All My Tasks"){
  // For "group" we refer to a group of tasks, such as tasks of the week, or tasks for a certain project
  const groupTitle = document.querySelector(".tasksContainerHeader h3");
  displayGroupTitle(groupTitle, group);
  displayTaskElements();
  displayTaskEditor();
}

function displayGroupTitle(title, group){
  title.textContent = group;
}

function renderHomePage(){
  renderContent();
  renderSidebar(getProjects());
}

export { renderHomePage, renderContent };