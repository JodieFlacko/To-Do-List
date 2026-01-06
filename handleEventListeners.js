import { createEmptyNote, getCurrentNote, updateCurrentNote, removeNote, updateCurrentGroup } from "./handleNotes";
import { displayTaskElements } from "./displayNotes";
import { displayTaskEditor, hideTaskEditor } from "./displayNoteEditor";
import { renderContent } from "./renderPageContent";
import { showAddProjectModal } from "./createComponents";

const form = document.querySelector(".addTaskForm");
const tasksList = document.querySelector(".tasksListUl");
const taskEditor = document.querySelector(".taskEditor");
const datetimeEditor = document.querySelector('.taskDateEditor');
const navbar = document.querySelector(".appSidebarNav_Items");
const addProjectButton = document.querySelector(".AppSidebarEditButtonsBox");

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

function handleNavbar(event){
  if(!event.target.closest(".appSidebarGroupsItems_item_button")) return;
  else { 
    const button = event.target.closest(".appSidebarGroupsItems_item_button")
    const group = button.querySelector(".appSidebarGroupsItems_item_categoryTitle").textContent;
    updateCurrentGroup(group);
    renderContent(group);
  }
}

function handleAddNewProjectButton(event){
  if(!event.target.closest(".AppSidebarEditButtonsBox")) return;
  else{
    showAddProjectModal((newProjectName) => {
          // --- THIS CODE RUNS LATER ---
          // It only runs when the user hits "Continue" in the modal.
          // 'newProjectName' is the text the user typed.

          console.log('User finished typing:', newProjectName);

          // A. Save to Data (Model)
          const newProject = ProjectModel.addProject(newProjectName);

          // B. Update Screen (View)
          // We get the fresh list of projects and tell the sidebar to re-render
          SidebarView.renderSidebar(ProjectModel.getProjects());
          
          // Optional: You could also switch to this new view immediately
          // App.switchView(newProject.id); 
      });
  }
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

  navbar.addEventListener("click", (event) => {
    handleNavbar(event);
  });

  addProjectButton.addEventListener("click", (event => {
    handleAddNewProjectButton(event);
  }))

  datetimeEditor.addEventListener('click', datetimeEditor.showPicker);

}