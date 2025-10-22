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

export {appendChildren, formatNoteDate };