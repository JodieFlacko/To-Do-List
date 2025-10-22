import { getNotes, updateCurrentNote} from "./handleNotes";
import { getProjects } from "./handleProjects";
import { createProjectElement, createTaskListElement } from "./createComponents";
import { displayTaskEditor } from "./displayNoteEditor";
function displayHomePageInfo(){
  displayTaskElements();
  displayProjects();
  displayTaskEditor();
}

function displayTaskElements(){
  const tasksList = document.querySelector(".tasksListUl");
  // Empty task list
  tasksList.textContent = "";
  // Display updated list
  const tasks = getNotes();
  tasks.forEach(task => {
    const taskLi = createTaskListElement();
    const text = taskLi.querySelector("p");
    text.textContent = task["title"];
    taskLi.dataset.id = task["id"];
    tasksList.appendChild(taskLi);
  });
};

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

export { displayHomePageInfo, displayTaskElements, displayProjects, displayTaskEditor };