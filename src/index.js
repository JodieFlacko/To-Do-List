import "./styles/style.css";
import "./styles/css-reset-by-Josh-Cameau.css";
import {createNote, getNote, getNotes, removeNote, removeProject} from "../handleNotes";
import { displayTaskElements, displayProjects } from "../displayNotes";
import { initEventListeners } from "../handleEventListeners";

displayTaskElements();
displayProjects();
initEventListeners();
removeProject("Personal Project");
displayProjects();
