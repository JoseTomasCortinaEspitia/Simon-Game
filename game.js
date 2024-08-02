const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

$(document).ready(function() {
  $("#level-title").text("Presiona una tecla para jugar");

  $(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
  });

  $(document).keypress(function() {
    if (level === 0) {
      nextSequence();
    }
  });
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Nivel " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(color) {
  switch (color) {
    case "red":
      const redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "blue":
      const blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "green":
      const greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "yellow":
      const yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  // Comparamos el último botón presionado por el usuario con el botón correspondiente en la secuencia del juego
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // Si coinciden, verificamos si el usuario ha completado toda la secuencia
    if (userClickedPattern.length === gamePattern.length) {
      // Si la secuencia es correcta, iniciamos la siguiente ronda con un pequeño retraso
      setTimeout(nextSequence, 1000);
    }
  } else {
    // Si hay un error, reiniciamos el juego
    console.log("Game Over");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  $("#level-title").text("Game Over, Presiona una tecla para jugar de nuevo");
}
