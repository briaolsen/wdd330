import * as ls from './ls.js' ;

export default class Comments {
  
  constructor(){
    this.comments = ls.loadLocalStorage();
    this.comments = [
      {
        type: "hikes",
        name: "Bechler Falls",
        date: new Date(),
        content: "Comment #1"
      }
    ]
  }

  showCommentsList(){
    console.log("Show Comments List");
    let container = document.createElement("div");
    container.className = "comments";
    
    renderCommentsList(container, this.getAllComments());
    return container;
  }
  
  getAllComments(){
    return this.comments;
  }

  filterCommentsByName(hikeName) {
     let newList = [];
     for (let i = 0; i < this.comments.length(); i++) {
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
      date:  new Date(),
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
  item.innerHTML = `<h2>${comment.name}</h2>
  <p class="comment">${comment.content}</p>`;
  return item;
}

function renderCommentsHike(comment) {

}