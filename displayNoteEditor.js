import { formatNoteDate } from "./helperFunctions";
import { getCurrentNote } from "./handleNotes";
import { getProjects } from "./handleProjects";

const noteCard = document.querySelector(".taskEditor");

function displayTaskEditor(){
  const note = getCurrentNote();
  if(!note) {
    noteCard.style.display = "none";
    return;
  }
  else { 
    noteCard.style.display = "flex";
  }
  const noteCardTitleEditor = noteCard.querySelector(".taskTitleEditor");
  const noteCardDate = noteCard.querySelector(".taskDate");
  const noteCardProjectSelector = noteCard.querySelector(".taskProjectEditor");
  const noteCardPrioritySelector = noteCard.querySelector(".taskPriorityEditor");
  const projects = getProjects();
  const priorities = ["Low", "Medium", "High"];
  populateSelector(noteCardProjectSelector, projects);
  populateSelector(noteCardPrioritySelector, priorities);

  noteCardTitleEditor.value = note.title;
  if(note.dueDate !== "Due Date") {
    const date = formatNoteDate(note.dueDate);
    noteCardDate.textContent = date;
  }
  else{
    noteCardDate.textContent = note.dueDate;
  }
}

function hideTaskEditor(){
  noteCard.style.display = "none";
}

function populateSelector(selector, values){
  selector.textContent = "";
  values.forEach(value => {
    const option = document.createElement("option");
    option.textContent = value;
    option.value = value;
    selector.appendChild(option);
  });
}

export {displayTaskEditor, hideTaskEditor};