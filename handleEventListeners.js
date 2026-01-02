import { createEmptyNote, getCurrentNote, updateCurrentNote, removeNote } from "./handleNotes";
import { displayTaskElements } from "./displayNotes";
import { displayTaskEditor, hideTaskEditor } from "./displayNoteEditor";

const form = document.querySelector(".addTaskForm");
const tasksList = document.querySelector(".tasksListUl");
const taskEditor = document.querySelector(".taskEditor");
const datetimeEditor = document.querySelector('.taskDateEditor');

function addNoteFromForm(event, form){
  event.preventDefault();
  const formData = new FormData(form);
  const title = formData.get("taskTitle");
  if(title === "") return;
  createEmptyNote(title);
  displayTaskElements();
  form.reset();
}

function handleNoteEdits(event){
  const parameter = event.target.name;
  const value = event.target.value;
  const note = getCurrentNote();
  note.update(parameter, value);
  displayTaskElements();
  displayTaskEditor();
}

function enableTaskEdit(event){  
  // Make sure li is clicked
  const taskElement = event.target.closest(".taskElement");
  if(!taskElement) return;

  // Update current note
  const id = taskElement.dataset.id;
  updateCurrentNote(id);
  displayTaskEditor();
}

function deleteTask(event){
  // Make sure li is clicked
  const taskElement = event.target.closest(".taskElementArchiveBtn");
  if(!taskElement) return;

  // Delete current note
  const id = getCurrentNote().id;
  removeNote(id);
  displayTaskElements();
  hideTaskEditor();
}

export function initEventListeners(){
  form.addEventListener("submit", event =>{ addNoteFromForm(event, form) });

  tasksList.addEventListener("click", event => {
    enableTaskEdit(event);
    deleteTask(event);
  });

  taskEditor.addEventListener('change', (e) => {
    handleNoteEdits(e);
  });



  datetimeEditor.addEventListener('click', datetimeEditor.showPicker);

}