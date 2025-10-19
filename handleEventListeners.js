import { createEmptyNote, getNote } from "./handleNotes";
import { displayTaskElements } from "./displayNotes";

const form = document.querySelector(".addTaskForm");
const tasksList = document.querySelector(".tasksListUl");

function displayNoteCard(event){
  // Making sure li is clicked
  const taskElement = event.target.closest(".taskElement");
  if(!taskElement) return;
  const id = taskElement.dataset.id;
  const note = getNote(id);
  const noteCard = document.querySelector(".taskEditor");
  const noteCardTitleEditor = noteCard.querySelector(".taskTitleEditor");
  const noteCardProjectSelector = noteCard.querySelector(".projectSelector");

  noteCardProjectSelector.textContent = "Fratm "
  noteCardTitleEditor.textContent = note.title;
}

function addNoteFromForm(event, form){
  event.preventDefault();
  const formData = new FormData(form);
  const title = formData.get("taskTitle");
  if(title === "") return;
  createEmptyNote(title);
  displayTaskElements();
  form.reset();
}

export function initEventListeners(){
  form.addEventListener("submit", event =>{ addNoteFromForm(event, form) });
  tasksList.addEventListener("click", event => {displayNoteCard(event)});
}