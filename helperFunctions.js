import { format } from "date-fns";

function appendChildren(parent, children){
  children.forEach(child => {
    parent.appendChild(child);
  });
}

function formatNoteDate(date) {
  const now = new Date();
  const diffInDays = Math.abs((now - date) / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 7) {
    // Within a week: "yesterday at 2:30 PM", "tomorrow at 9:00 AM"
    return formatRelative(date, now);
  } else {
    // Older: "Oct 21, 2025"
    return format(date, 'MMM d, yyyy');
  }
}

const getToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

const isSameDay = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
};

const isWithinNextDays = (targetDate, daysToCheck) => {
  const today = getToday();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + daysToCheck);
  
  // We check if the date is in the future (>= today) AND within the range
  return targetDate >= today && targetDate <= futureDate;
};

function filterTasks(view, allTasks){
  const today = getToday();
  
  return allTasks.filter(task =>{
    // Always show notes without dates
    if(!task.dueDate) return true;

    // Process the date as a data object if it exists
    const taskDate = new Date(task.dueDate)
    if(view === "My Day"){
      return isSameDay(today, taskDate);
    }

    if(view === "Next 7 Days"){
      return isWithinNextDays(taskDate, 7);
    }

    else{
      return true;
    }
  })
}

export {appendChildren, formatNoteDate, filterTasks};