window.onload = function () {
  setTimeout(() => {
    const quiz = [
      { name: "Superman", realName: "Clark Kent" },
      { name: "Wonder Woman", realName: "Diana Prince" },
      { name: "Batman", realName: "Bruce Wayne" },
    ];

    // View Object
    const view = {
      score: document.querySelector("#score strong"),
      question: document.getElementById("question"),
      result: document.getElementById("result"),
      info: document.getElementById("info"),
      start: document.getElementById("start"),
      render(target, content, attributes) {
        for (const key in attributes) {
          target.setAttribute(key, attributes[key]);
        }
        target.innerHTML = content;
      },
      show(element) {
        element.style.display = "block";
      },
      hide(element) {
        element.style.display = "none";
      },
    };

    const game = {
      start(quiz) {
        this.questions = [...quiz];
        this.score = 0;
        // main game loop
        for (const question of this.questions) {
          this.question = question;
          this.ask();
        }
        view.hide(view.start);
        // end of main game loop
        this.gameOver();
      },
      ask() {
        const question = `What is ${this.question.name}'s real name?`;
        view.render(view.question, question);
        const response = prompt(question);
        this.check(response);
      },
      check(response) {
        const answer = this.question.realName;
        if (response === answer) {
          view.render(view.result, "Correct!", { class: "correct" });
          alert("Correct!");
          this.score++;
          view.render(view.score, this.score);
        } else {
          view.render(view.result, `Wrong! The correct answer was ${answer}`, {
            class: "wrong",
          });
          alert(`Wrong! The correct answer was ${answer}`);
        }
      },
      gameOver() {
        view.show(view.start);
        view.render(
          view.info,
          `Game Over, you scored ${this.score} point${
            this.score !== 1 ? "s" : ""
          }`
        );
      },
    };

    view.start.addEventListener("click", () => game.start(quiz), false);

    //game.start(quiz);
  }, 100);
};

/**
 * OLD STUFF
 **/

//const question = "What is Superman's real name?"
//const answer = prompt(question);
//alert(`You answered ${answer}`);

/*
const quiz = [
  ["What is Superman's real name?","Clark Kent"],
  ["What is Wonder Woman's real name?","Diana Prince"],
  ["What is Batman's real name?","Bruce Wayne"],
  ["What is The Flash's real name?","Barry Allen"],
  ["What is Green Lantern's real name?","Hal Jordan"]
];

let score = 0 // initialize score

alert('Welcome to Quiz Ninja!');

for(const [question,answer] of quiz){
  const response = prompt(question);
  if(response === answer){
      alert('Correct!');
      score++;
  } else {
      alert(`Wrong! The correct answer was ${answer}`);
  }
}

// At the end of the game, report the player's score
alert(`Game Over, you scored ${score} point${score !== 1 ? 's' : ''}`);
*/
