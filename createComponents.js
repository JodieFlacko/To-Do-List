import { appendChildren } from "./helperFunctions";
import { addProject } from "./projectModel";
import { renderSidebar } from "./sidebarView";

function createProjectElement(){
  const projectElementWrapper = document.createElement("div");
  const btn = document.createElement("button");
  const title = document.createElement("div");

  projectElementWrapper.className = "AppSidebarGroupsItem_Item";
  btn.className = "appSidebarGroupsItems_item_button";
  title.className = "appSidebarGroupsItems_item_categoryTitle";

  projectElementWrapper.appendChild(btn);
  btn.appendChild(title);

  return projectElementWrapper;
};

function createTaskListElement(){
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

export function showAddProjectModal() {
  // 1. Create the Overlay
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  // 2. Create the Box
  const modal = document.createElement('div');
  modal.className = 'modal-box';

  // 3. Close Button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close';
  closeBtn.innerHTML = '&times;'; // HTML entity for 'x'
  closeBtn.onclick = closeModal;

  // 4. Input Field
  const input = document.createElement('input');
  input.className = 'modal-input';
  input.type = 'text';
  input.placeholder = 'Add a list title';
  input.maxLength = 30;

  // 5. Continue Button
  const submitBtn = document.createElement('button');
  submitBtn.className = 'modal-btn';
  submitBtn.textContent = 'Continue';
  submitBtn.disabled = true; // Disabled initially

  // --- Logic ---

  // Helper to remove modal
  function closeModal() {
    document.body.removeChild(overlay);
  }

  // Helper to handle submission
  function handleSubmit() {
    const name = input.value.trim();
    if (name) {
      addProject(name);
      renderSidebar();
      closeModal();
    }
  }

  // Enable button only if text exists
  input.addEventListener('input', () => {
    submitBtn.disabled = input.value.trim() === '';
  });

  // Submit on "Enter" key
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !submitBtn.disabled) {
      handleSubmit();
    }
    if (e.key === 'Escape') {
      closeModal();
    }
  });

  // Submit on Click
  submitBtn.addEventListener('click', handleSubmit);

  // Close if clicking outside the modal box
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  // --- Assembly ---
  modal.appendChild(closeBtn);
  modal.appendChild(input);
  modal.appendChild(submitBtn);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Focus the input automatically for better UX
  input.focus();
}

export {createProjectElement, createTaskListElement}

