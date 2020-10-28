
export function saveLocalStorage(commentsArray) {
  localStorage.setItem('comments', JSON.stringify(commentsArray));
}

export function loadLocalStorage() {
  if (localStorage.getItem('comments')) {
    return JSON.parse(localStorage.getItem('comments'));
  } else {
    return [];
  }
}