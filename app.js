var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var scoreElement = document.getElementById('score');
var highScoreElement = document.getElementById('high-score');
var gameOverPopup = document.getElementById('game-over-popup');
var restartButton = document.getElementById('restart-button');
var pauseButton = document.getElementById('pause-button');
var specialSwitch = document.getElementById('special-switch');
var onLabel = document.getElementById('on-label');
var offLabel = document.getElementById('off-label');
var speedButtons = document.querySelectorAll('.speed-button');
var questionInput = document.getElementById('question');

// Snake variables
var snake = {
  x: 160,
  y: 160,
  cells: [],
  maxCells: 1,
  dx: 0,
  dy: 0
};

// Apple variable
var apple = {
  x: 320,
  y: 320
};

// Game variables
var highScore = 0;
var speed = 6; // Default speed
var grid = 16;
var count = 0;
var paused = false;
var specialSwitchState = false;
var keyStates = {};

// Helper function to get a random integer
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Helper function to update the score display
function updateScore() {
  scoreElement.textContent = 'Score: ' + snake.cells.length;
}

// Helper function to update the high score display
function updateHighScore() {
  if (snake.cells.length > highScore) {
    highScore = snake.cells.length;
    highScoreElement.textContent = 'High Score: ' + highScore;
  }
}

// Helper function to restart the game
function restartGame() {
  snake.x = 160;
  snake.y = 160;
  snake.cells = [];
  snake.maxCells = 1;
  snake.dx = 0;
  snake.dy = 0;

  apple.x = getRandomInt(0, 25) * grid;
  apple.y = getRandomInt(0, 25) * grid;

  updateScore();
  hideGameOverPopup();
}

// Helper function to display the game over popup
function showGameOverPopup() {
  gameOverPopup.style.display = 'block';
}

// Helper function to hide the game over popup
function hideGameOverPopup() {
  gameOverPopup.style.display = 'none';
}

// Helper function to toggle pause
function togglePause() {
  paused = !paused;
  pauseButton.textContent = paused ? 'Resume' : 'Pause';
}

// Helper function to toggle the special switch
function toggleSpecialSwitch() {
  specialSwitchState = !specialSwitchState;
  onLabel.style.color = specialSwitchState ? 'green' : 'white';
  offLabel.style.color = specialSwitchState ? 'white' : 'red';
}

// Event listener for the restart button
restartButton.addEventListener('click', function () {
  restartGame();
});

// Event listener for the pause button
pauseButton.addEventListener('click', function () {
  togglePause();
});

// Event listener for the speed buttons
speedButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    speed = parseFloat(button.dataset.speed);
  });
});

// Event listener for keydown events
document.addEventListener('keydown', function (e) {
  keyStates[e.which] = true;

  if (e.which === 32) {
    togglePause();
  } else if (!paused) {
    handleSnakeDirection();
  }
});

// Event listener for keyup events
document.addEventListener('keyup', function (e) {
  keyStates[e.which] = false;
  handleSnakeDirection();
});

// Helper function to handle snake direction
function handleSnakeDirection() {
  if ((keyStates[37] || keyStates[65]) && snake.dx === 0) {
    snake.dx = specialSwitchState ? (snake.x <= 0 ? grid : -grid) : -grid;
    snake.dy = 0;
  } else if ((keyStates[38] || keyStates[87]) && snake.dy === 0) {
    snake.dy = specialSwitchState ? (snake.y <= 0 ? grid : -grid) : -grid;
    snake.dx = 0;
  } else if ((keyStates[39] || keyStates[68]) && snake.dx === 0) {
    snake.dx = specialSwitchState ? (snake.x >= canvas.width - grid ? -grid : grid) : grid;
    snake.dy = 0;
  } else if ((keyStates[40] || keyStates[83]) && snake.dy === 0) {
    snake.dy = specialSwitchState ? (snake.y >= canvas.height - grid ? -grid : grid) : grid;
    snake.dx = 0;
  }
}

// Helper function to check if the game is over
function isGameOver() {
  return gameOverPopup.style.display === 'block';
}

// Helper function to handle game over
function handleGameOver() {
  showGameOverPopup();
  keyStates = {}; // Clear keyStates to stop snake movement
}

// Game loop
function loop() {
  requestAnimationFrame(loop);

  if (paused || isGameOver()) {
    return;
  }

  if (++count < speed) {
    return;
  }

  count = 0;
  context.clearRect(0, 0, canvas.width, canvas.height);

  snake.x += snake.dx;
  snake.y += snake.dy;

  // Check if the snake hits the canvas boundaries
  if (snake.x < 0 || snake.x >= canvas.width || snake.y < 0 || snake.y >= canvas.height) {
    if (!specialSwitchState) {
      handleGameOver();
    } else {
      // Wrap around the canvas
      snake.x = (snake.x + canvas.width) % canvas.width;
      snake.y = (snake.y + canvas.height) % canvas.height;
    }
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  // Check if the snake eats the apple
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  context.fillStyle = 'red';
  context.fillRect(apple.x, apple.y, grid - 1, grid - 1);

  context.fillStyle = 'green';
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // Check if the snake collides with itself
    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        handleGameOver();
      }
    }
  });

  // Check if the snake eats the apple
  if (snake.cells[0].x === apple.x && snake.cells[0].y === apple.y) {
    snake.maxCells++;
    apple.x = getRandomInt(0, 25) * grid;
    apple.y = getRandomInt(0, 25) * grid;
    updateScore();
    updateHighScore();
  }
}

requestAnimationFrame(loop);

// Magic 8 Ball functionality

// Helper function to generate Magic 8 Ball answers
function generateMagic8BallAnswer() {
  const responsesYes = [
    // ... (
    // ... (previous responsesYes content)

    // Add new responses to the existing array as needed

    "New response for 'Yes' category",
    "Another positive response"
  ];

  const responsesNo = [
    // ... (previous responsesNo content)

    // Add new responses to the existing array as needed

    "New response for 'No' category",
    "Another negative response"
  ];

  const randomResponse = Math.random() < 0.5 ?
    responsesYes[Math.floor(Math.random() * responsesYes.length)] :
    responsesNo[Math.floor(Math.random() * responsesNo.length)];

  return randomResponse;
}

// Helper function to add messages to the chat box
function addMessageToChat(question, answer) {
  const chatBox = document.getElementById('chat-box');
  chatBox.innerHTML = ''; // Clear the entire chat box

  // Display only the latest question and answer
  const messageContainer = document.createElement('div');
  messageContainer.classList.add('message-container');

  const questionElement = document.createElement('div');
  questionElement.classList.add('question');
  questionElement.textContent = question;

  const answerElement = document.createElement('div');
  answerElement.classList.add('answer');
  answerElement.innerHTML = `<strong>Answer:</strong> ${answer}`;

  messageContainer.appendChild(questionElement);
  messageContainer.appendChild(answerElement);

  chatBox.appendChild(messageContainer);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Event listener for the Enter key in the question input
questionInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault(); // Prevent the default behavior of the Enter key
    getMagic8BallAnswer();
  }
});

// Event listener for the Ask button
function getMagic8BallAnswer() {
  const answerElement = document.getElementById('magic8ball-answer');
  const question = questionInput.value.trim();

  if (question !== '' && question !== 'Ask anything') {
    const answer = generateMagic8BallAnswer();
    answerElement.innerHTML = `<strong>Magic 8 Ball says:</strong> ${answer}`;
    addMessageToChat(question, answer);
    questionInput.value = 'Ask anything';
    questionInput.style.color = 'gray';
  } else {
    answerElement.textContent = 'Ask me anything';
  }
}