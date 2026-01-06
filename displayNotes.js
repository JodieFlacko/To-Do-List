import { getNotes } from "./handleNotes";
import { createTaskListElement } from "./createComponents";
import { getTasksForView } from "./helperFunctions";
import { getCurrentGroup } from "./handleNotes";

function displayTaskElements(){
  const tasksList = document.querySelector(".tasksListUl");
  // Empty task list
  tasksList.textContent = "";
  // Display updated list
  const allTasks = getNotes();
  const group = getCurrentGroup();
  const tasksToShow = getTasksForView(group, allTasks);
  tasksToShow.forEach(task => {
    const taskLi = createTaskListElement();
    const text = taskLi.querySelector("p");
    text.textContent = task["title"];
    taskLi.dataset.id = task["id"];
    tasksList.appendChild(taskLi);
  });
};

export { displayTaskElements };