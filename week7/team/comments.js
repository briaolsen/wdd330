import * as ls from './ls.js' ;

export default class Comments {
  
  constructor(){
    this.comments = ls.loadLocalStorage();
  }

  showCommentsList(commentsList){
    console.log("Show Comments List");
    let container = document.createElement("div");
    container.className = "comments";
    
    renderCommentsList(container, commentsList);
    return container;
  }
  
  getAllComments(){
    return this.comments;
  }

  filterCommentsByName(hikeName) {
     let newList = [];
     for (let i = 0; i < this.comments.length; i++) {
        if (this.comments[i].name === hikeName) {
           newList.push(this.comments[i])
        }
     }
     return newList;
  }

  addComment(tag, hikeName, comment){   

    const newComment = {
      type: tag,
      name: hikeName,
      date: new Date(),
      content: comment
    }
    
    this.comments.push(newComment);

    ls.saveLocalStorage(this.comments);
  }

};

function renderCommentsList(container, comments) {
  comments.forEach(comment => {
    container.appendChild(renderComment(comment));
  })
}

function renderComment(comment) {
  const item = document.createElement("div");
  item.innerHTML = `<h3>${comment.name} - ${comment.date}</h3>
  <p class="comment">${comment.content}</p>`;
  return item;
}

function renderCommentsHike(comment) {

}