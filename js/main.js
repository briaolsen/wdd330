//creates a file directory on the main index file
function makeDirectory() {
  // a list of assignments and urls
  const notes = [
    {
      label: "Week 1 Notes",
      url: "week1",
    },
    {
      label: "Week 2 Notes",
      url: "week2",
    },
    {
      label: "Week 3 Notes",
      url: "week3",
    },
    {
      label: "Week 4 Notes",
      url: "week4",
    },
    {
      label: "Week 5 Notes",
      url: "week5",
    },
    {
      label: "Week 6 Notes",
      url: "",
    },
    {
      label: "Week 7 Notes",
      url: "week7",
    },
    {
      label: "Week 8 Notes",
      url: "week8",
    },
    {
      label: "Week 9 Notes",
      url: "week9",
    },
    {
      label: "Week 10 Notes",
      url: "week10",
    },
  ];

  for (var i = 0; i < notes.length; i++) {
    // create a list element
    var link = document.createElement("li");

    // add the text to the list item
    link.innerHTML = `<a href="${notes[i].url}">${notes[i].label}</a>`;

    document.getElementById("directory").appendChild(link);
  }
}

//creates a file directory on the main index file
function makePractice() {
  // a list of assignments and urls
  const links = [
    {
      label: "Quiz Ninja",
      url: "quiz",
    },
  ];

  for (var i = 0; i < links.length; i++) {
    // create a list element
    var link = document.createElement("li");

    // add the text to the list item
    link.innerHTML = `<a href="${links[i].url}">${links[i].label}</a>`;

    document.getElementById("practice").appendChild(link);
  }
}

//creates a file directory on the main index file
function makeJS30() {
  // a list of assignments and urls
  const links = [
    {
      label: "JavaScript Drum Kit",
      url: "JavaScript30/JavaScriptDrumKit/",
    },
    {
      label: "JS and CSS Clock",
      url: "JavaScript30/JSandCSSClock/",
    },
    {
      label: "CSS Variables",
      url: "JavaScript30/CSS Variables/",
    },
    {
      label: "Array1",
      url: "JavaScript30/Array1/",
    },
    {
      label: "Flex Panel Gallery",
      url: "JavaScript30/FlexPanelGallery/",
    },
    {
      label: "Ajax Type Ahead",
      url: "JavaScript30/TypeAhead/",
    },
    {
      label: "Array Cardio 2",
      url: "JavaScript30/Array2/",
    },
    {
      label: "HTML5 Canvas",
      url: "JavaScript30/HTML5Canvas/",
    },
    {
      label: "Dev Tools and Tricks",
      url: "JavaScript30/DevTools/",
    },
  ];

  for (var i = 0; i < links.length; i++) {
    // create a list element
    var link = document.createElement("li");

    // add the text to the list item
    link.innerHTML = `<a href="${links[i].url}">${links[i].label}</a>`;

    document.getElementById("js30").appendChild(link);
  }
}
