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

const VIEW_FILTERS = {
  "My Day": (task) => {
    if (!task.dueDate) return false; // Usually "My Day" implies strict date
    const taskDate = new Date(task.dueDate);
    const today = getToday();
    return isSameDay(taskDate, today);
  },
  
  "Next 7 Days": (task) => {
    if (!task.dueDate) return false;
    const taskDate = new Date(task.dueDate);
    return isWithinNextDays(taskDate, 7); // Reusing your existing helper
  },

  "All My Tasks": (task) => true, // Return everything
};

function getTasksForView(viewName, allTasks) {
  // 1. Check if the view matches a predefined strategy (My Day, Next 7 Days)
  const strategy = VIEW_FILTERS[viewName];

  if (strategy) {
    return allTasks.filter(strategy);
  }

  // 2. Fallback: If no strategy is found, assume 'viewName' is a Project Name
  return allTasks.filter(task => task.project == viewName);
}

export {appendChildren, formatNoteDate, getTasksForView};