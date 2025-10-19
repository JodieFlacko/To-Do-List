function appendChildren(parent, children){
  children.forEach(child => {
    parent.appendChild(child);
  });
}

export {appendChildren };