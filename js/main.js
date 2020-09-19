
//creates a file directory on the main index file
function makeDirectory() {

  // a list of assignments and urls
  const links = [
    {
      label: "Week1 Notes",
      url: "week1/index.html",
    },
  ];

  for (var i = 0; i < links.length; i++) {
    // create a list element
    var link = document.createElement('li');

    // add the text to the list item
    link.innerHTML = `<a href="${links[i].url}">${links[i].label}</a>`;

    document.getElementById('directory').appendChild(link);
  }
  

}
