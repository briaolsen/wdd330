
//creates a file directory on the main index file
function makeDirectory() {

  // a list of assignments and urls
  const notes = [
    {
      label: "Week 1 Notes",
      url: "week1/index.html",
    },
    {
      label: "Week 2 Notes",
      url: "week2/index.html",
    },
    {
      label: "Week 3 Notes",
      url: "week3/index.html",
    },
    {
      label: "Week 4 Notes",
      url: "week4/index.html",
    },
  ];

  for (var i = 0; i < notes.length; i++) {
    // create a list element
    var link = document.createElement('li');

    // add the text to the list item
    link.innerHTML = `<a href="${notes[i].url}">${notes[i].label}</a>`;

    document.getElementById('directory').appendChild(link);
  }
  

}

//creates a file directory on the main index file
function makePractice() {

  // a list of assignments and urls
  const links = [
    {
      label: "Quiz Ninja",
      url: "quiz/index.html",
    },

  ];

  for (var i = 0; i < links.length; i++) {
    // create a list element
    var link = document.createElement('li');

    // add the text to the list item
    link.innerHTML = `<a href="${links[i].url}">${links[i].label}</a>`;

    document.getElementById('practice').appendChild(link);
  }
  

}
