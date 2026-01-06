import { formatNoteDate } from "./helperFunctions";
import { getCurrentNote } from "./handleNotes";
import { getProjects } from "./handleProjects.js";

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
  populateSelector(noteCardProjectSelector, projects, note);
  populateSelector(noteCardPrioritySelector, priorities, note);

  noteCardTitleEditor.value = note.title;
  if(!note.dueDate) {
    noteCardDate.textContent = "Remind Me";
  }
  else{

    noteCardDate.textContent = formatNoteDate(note.dueDate);
  }
}

function hideTaskEditor(){
  noteCard.style.display = "none";
}

function populateSelector(selector, values, currentNote){
  selector.textContent = "";
  values.forEach(value => {
    const option = document.createElement("option");
    option.textContent = value;
    option.value = value;
    if(currentNote[selector.name] === option.value){
      option.selected = true;
    }

    selector.appendChild(option);
  });
}

export {displayTaskEditor, hideTaskEditor};