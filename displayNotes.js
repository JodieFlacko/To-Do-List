import { getNotes } from "./handleNotes";
import { createTaskListElement } from "./createComponents";

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

export { displayTaskElements };