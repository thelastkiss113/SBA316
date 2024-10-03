const textElement = document.getElementById("text"); // 1. Cache at least one element using selectElementById.
const optionButtonsElement = document.querySelector("#option-buttons"); // 1. Cache at least one element using querySelector or querySelectorAll.
const playerForm = document.getElementById("player-form"); // form for player's name - Include at least one form and/or input with HTML attribute validation.
const playerNameInput = document.querySelector("#player-name"); // grab player's name and store local storage.
const resetButton = document.getElementById("reset-game"); // reset the game.

let state = {};
let playerName = "";
let typingSpeed = 50; // Speed of the typewriter effect.

// 1. cache -- textElement, playerForm, playerNameInput, resetButton = by getElementById.
// 2. querySelector('#option-buttons') & querySelector('#player-name') = Cache at least one element using querySelector or querySelectorAll.

// Show the form initially, then start the game once the form is submitted.
playerForm.addEventListener("submit", (event) => {
  // 11. Register at least two different event listeners and create the associated event handler functions.
  event.preventDefault();

  // 14. Include DOM event-based validation.
  // Get the player's name and store it in localStorage.
  playerName = playerNameInput.value;
  localStorage.setItem("playerName", playerName);

  // Hide the form and show the game UI.
  // 9. Modify the style or CSS classes of an element:
  playerForm.style.display = "none";
  textElement.style.display = "block";
  optionButtonsElement.style.display = "grid"; // Show the option buttons only after the name is submitted.

  startGame(); // Start the game.
});

function startGame() {
  state = {}; // Reset game state.
  showTextNode(1);
  resetButton.style.display = "none"; // Hide the reset button initially.
}

// Create a typewriter effect for text.
function typeWriter(text, i = 0) {
  if (i < text.length) {
    textElement.innerHTML += text.charAt(i); // Add one character at a time.
    setTimeout(() => typeWriter(text, i + 1), typingSpeed); // Set delay based on typingSpeed.
  } else {
    enableOptionButtons(); // Once typing is done, show the buttons.
  }
}

// Modify the textNode rendering to include typewriter effect.
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  const formattedText = textNode.text.replace("{playerName}", playerName); // Use player's name.

  textElement.innerHTML = ""; // Clear the previous text.
  disableOptionButtons(); // Disable buttons until text finishes typing.

  typeWriter(formattedText); // Start typing the text.

  // Clear old options while the text is being typed.
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  // Use the DocumentFragment interface.
  const fragment = document.createDocumentFragment();

  // Iterate over the options array of the current textNode and create buttons.
  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button"); // 5. Create at least one element using createElement.
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option)); // Add event listener to the button.

      // Disable button after it’s clicked.
      button.setAttribute("data-selected", "false");
      button.addEventListener("click", () => button.setAttribute("data-selected", "true"));

      fragment.appendChild(button); // Append buttons to fragment.
    }
  });

  optionButtonsElement.appendChild(fragment); // Append the button fragment to the DOM.
}

function disableOptionButtons() {
  optionButtonsElement.style.display = "none"; // Hide buttons during typing.
}

function enableOptionButtons() {
  optionButtonsElement.style.display = "block"; // Show buttons once text is typed.
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return endGame(); // Call the endGame function to handle restart.
  }
  state = Object.assign(state, option.setState); // Merge state.
  showTextNode(nextTextNodeId);
}

function endGame() {
  textElement.innerText = `Thank you for playing, ${playerName}! Would you like to play again?`;
  resetButton.style.display = "block"; // Show reset button to restart.
  resetButton.addEventListener("click", startGame);
  alert("Game over!"); // BOM method to show an alert when the game ends.
}

const textNodes = [
    {
      id: 1,
      text: "You're on a spaceship, alone. A strange noise comes from the cargo hold.",
      options: [
        {
          text: "Investigate: \"I'm not afraid of a little noise. Let's check it out.\"",
          nextText: 2,
        },
        {
          text: "Ignore: \"Probably just the wind. I'll ignore it.\"",
          nextText: 8,
        },
        {
          text: "Call for help: \"Maybe I should call for backup. Just in case.\"",
          nextText: 7,
        },
        {
          text: "Hide: \"I'm not sure if I want to face whatever's in there.\"",
          nextText: 8,
        },
      ],
    },
    {
      id: 2,
      text: "You open the cargo hold door. A small, green alien is staring at you.",
      options: [
        {
          text: "Scream: \"AAAAAHHHHH! What the heck is that?!\"",
          nextText: 99,  // You die 
        },
        {
          text: "Talk: \"Hello? Can you understand me?\"",
          nextText: 3,
        },
        {
          text: "Attack: \"I'm not taking any chances. Here's a wrench!\"",
          nextText: 99,  // You die 
        },
        {
          text: "Befriend: \"Hey there, little guy. Want a snack?\"",
          nextText: 4,
        },
      ],
    },
    {
      id: 3,
      text: "The alien makes strange sounds, but you don't understand it. You feel uneasy...",
      options: [
        {
          text: "Keep talking: \"We need to communicate. Let me try again.\"",
          nextText: 99,  // You die 
        },
        {
          text: "Step back slowly: \"I think I need to give it some space...\"",
          nextText: 5,
        },
      ],
    },
    {
      id: 4,
      text: "The alien takes the food and seems to calm down.",
      options: [
        {
          text: "Ask questions: \"Where are you from? What are you doing here?\"",
          nextText: 10,  // End game
        },
        {
          text: "Leave: \"I think I've had enough excitement for one day.\"",
          nextText: 5,
        },
      ],
    },
    {
      id: 5,
      text: "You leave the cargo hold. The alien stays behind. You continue your journey alone.",
      options: [
        {
          text: "The End.",
          nextText: -1,  // End game
        },
      ],
    },
    {
      id: 6,
      text: "You encounter a black hole and get sucked in. It seems there's no escape.",
      options: [
        {
          text: "The End.",
          nextText: -1,  // End game
        },
      ],
    },
    {
      id: 7,
      text: "You call for backup, but nobody responds. You hear a noise approaching...",
      options: [
        {
          text: "Investigate the noise.",
          nextText: 99,  // You die 
        },
        {
          text: "Hide until it passes.",
          nextText: 5,
        },
      ],
    },
    {
      id: 8,
      text: "You decide to stay where you are. Nothing happens for a while. Maybe it was just your imagination.",
      options: [
        {
          text: "Go check the noise.",
          nextText: 2,
        },
        {
          text: "Stay put.",
          nextText: 5,
        },
      ],
    },
    {
      id: 9,
      text: "You decide to explore the ship's control room, but the ship malfunctions.",
      options: [
        {
          text: "The End.",
          nextText: -1,  // End game
        },
      ],
    },
    {
      id: 10,
      text: "The alien communicates back, and you learn about its home planet. You forge an alliance.",
      options: [
        {
          text: "Celebrate your new friendship.",
          nextText: -1,  // End game
        },
      ],
    },
    {
      id: 99,
      text: " A long tentacle wraps around your body and the creature opens its mouth to reveal many jagged teeth. Your life flashes before your eyes. You die.", // You die
      options: [
        {
          text: "Restart", //Restart Game
          nextText: 1,  
        },
      ],
    },
  ];

// Load player's name from localStorage BOM if previously saved.
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("playerName");
  if (savedName) {
    playerName = savedName;
    playerNameInput.value = savedName;
  }
});

//* * * * Stars * * * 
function createStars(numStars) {
    const starContainer = document.body;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        starContainer.appendChild(star);
    }
}

createStars(50);
