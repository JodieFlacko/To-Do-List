import { getNote, getNotes, getProjects } from "./handleNotes";
import { appendChildren } from "./helperFunctions";

function displayTaskElements(){
  const tasks = getNotes();
  const tasksList = document.querySelector(".tasksListUl");
  tasksList.textContent = "";
  tasks.forEach(task => {
    const taskLi = createTaskListItem();
    const text = taskLi.querySelector("p");
    text.textContent = task["title"];
    taskLi.dataset.id = task["id"];
    tasksList.appendChild(taskLi);
  });
};

function handleNoteCard(id){
  const note = getNote(id);
  const title = document.querySelector(".taskTitleEditor");
  title.textContent = note.title;

  function displayPriority(){

  };
  function displayProjects(){

  };
  function displayInfo(){

  };
}

function createTaskListItem(){
  const taskLi = document.createElement("li");
  const checkBtn = document.createElement("button");
  const title = document.createElement("p");


  const actionBtnsContainer = document.createElement("div");
  const archiveBtn = document.createElement("button");
  archiveBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>archive-outline</title><path d="M20 21H4V10H6V19H18V10H20V21M3 3H21V9H3V3M9.5 11H14.5C14.78 11 15 11.22 15 11.5V13H9V11.5C9 11.22 9.22 11 9.5 11M5 5V7H19V5H5Z" /></svg>`;

  taskLi.role = "button";

  taskLi.className = "taskElement";
  checkBtn.className = "taskElementCheckBtn";
  title.className = "taskElementTitle";
  actionBtnsContainer.className = "actionBtnsContainer";
  archiveBtn.className = "taskElementArchiveBtn";

  actionBtnsContainer.appendChild(archiveBtn);

  appendChildren(taskLi, [checkBtn, title, actionBtnsContainer]);

  return taskLi;
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

function createProjectElement(){
  const itemWrapper = document.createElement("div");
  const itemButton = document.createElement("button");
  const itemTitle = document.createElement("div");

  itemWrapper.className = "AppSidebarGroupsItem_Item";
  itemButton.className = "appSidebarGroupsItems_item_button";
  itemTitle.className = "appSidebarGroupsItems_item_categoryTitle";

  itemWrapper.appendChild(itemButton);
  itemButton.appendChild(itemTitle);

  return itemWrapper;
};

export { displayTaskElements, displayProjects };