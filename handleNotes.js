let notes = [];

class Note{
  constructor(data){
    this.title = data.title;
    this.project = data.project;
    this.dueDate = data.dueDate;
    this.priority = data.priority;
    this.notes = data.notes;
    this.id = crypto.randomUUID();
  };

  update(parameter, value){
    this[parameter] = value;
  };
};

// temp

// end temp

let currentNote = notes[0];


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
    dueDate: "Due Date",
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

function getNoteIndex(id){
  const index = notes.findIndex(n => n.id === id);
  return index;
}

function updateCurrentNote(id){
  currentNote = getNote(id);
}

function getCurrentNote(){
  return currentNote;
}

function getNotes(){
  return notes;
}

export {createNote, getNotes, removeNote, getNote, createEmptyNote, getNoteIndex, updateCurrentNote, getCurrentNote};