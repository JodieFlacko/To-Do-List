import { displayProjects } from "./displayNotes";

let notes = [];
let projects = [
  "Work Project",
  "Grocery List",
  "Personal Project"
];

class Note{
  constructor(data){
    this.title = data.title;
    this.project = data.project;
    this.due_date = data.due_date;
    this.priority = data.priority;
    this.notes = data.notes;
    this.id = crypto.randomUUID();
  };

  update(updates){
    Object.keys(updates).forEach(key =>{
      if(this.hasOwnProperty(key) && key !== 'id'){
        this[key] = updates[key];
      }
    });
  };
};


// temp
const examples = [
  {
    title: "Design database schema",
    project: "E-commerce Platform",
    due_date: "2025-10-22",
    priority: "high",
    notes: "Create ERD for products, orders, and user tables. Consider indexing strategy for search optimization.",
    id: "1"
  },
  {
    title: "Update dependencies",
    project: "Maintenance",
    due_date: "2025-10-18",
    priority: "medium",
    notes: "Run npm audit and update all packages with security vulnerabilities. Test thoroughly after updates.",
    id: "2"
  },
  {
    title: "Write unit tests",
    project: "API Development",
    due_date: "2025-10-28",
    priority: "medium",
    notes: "Add test coverage for new payment processing endpoints. Aim for at least 80% coverage.",
    id: "3"
  },
];

examples.forEach(example => createNote(example));
// end temp

function createNote(data){
  if (!(data instanceof Object)) {
    console.log('Error! "data" is not an object');
    return;
    }
  else if(Object.keys(data).length !== 6) {
    console.log('Error! Invalid Object properties.');
    return;
  }
  const note = new Note(data);
  notes.push(note);
};

function createEmptyNote(taskTitle){
  const data = {
    title: taskTitle,
    project: undefined,
    due_date: undefined,
    priority: undefined,
    notes: undefined,
    id: crypto.randomUUID(),
  };
  const note = new Note(data);
  notes.push(note);
}

function removeNote(id){
  notes = notes.filter(note => note.id !== id);
}

function getNote(id){
  const note = notes.find(n => n.id === id)
  return note;
}

function getNotes(){
  return notes;
}

function createProject(project){
  projects.push(project);
}

function removeProject(project){
  projects = projects.filter(element => element !== project);
}

function getProjects(){
  return projects;
}
export {createNote, getNotes, removeNote, getNote, createEmptyNote, getProjects, createProject, removeProject};