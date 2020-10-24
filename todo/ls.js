
export function saveLocalStorage(todoArray) {
  localStorage.setItem('todos', JSON.stringify(todoArray));
}

export function getLocalStorage() {
  if (localStorage.getItem('todos')) {
    return JSON.parse(localStorage.getItem('todos'));
  } else {
    return [];
  }
}
