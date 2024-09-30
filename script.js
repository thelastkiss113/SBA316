const textElement = document.getElementById("text"); // 1. Cache at least one element using selectElementById.
const optionButtonsElement = document.querySelector("#option-buttons"); //1. Cache at least one element using querySelector or querySelectorAll.
const playerForm = document.getElementById("player-form"); // form for player's name - Include at least one form and/or input with HTML attribute validation.
const playerNameInput = document.querySelector("#player-name"); //grab player's name and store local storage
const resetButton = document.getElementById("reset-game"); //reset the game

let state = {};
let playerName = "";

//1. cache -- textElement, playerForm, playerNameInput, resetButton = by getElementById.
//2. querySelector('#option-buttons') & querySelector('#player-name') = Cache at least one element using querySelector or querySelectorAll.

// Show the form initially, then start the game once the form is submitted
playerForm.addEventListener("submit", (event) => {
  // 11. Register at least two different event listeners and create the associated event handler functions
  event.preventDefault();

  // 14. Include DOM event-based validation.
  // Get the player's name and store it in localStorage.
  playerName = playerNameInput.value;
  localStorage.setItem("playerName", playerName);

  // Hide the form and show the game UI
  // 9. Modify the style or CSS classes of an element:
  playerForm.style.display = "none";
  textElement.style.display = "block";
  optionButtonsElement.style.display = "block";

  startGame(); // start the game
});

function startGame() {
  state = {};
  showTextNode(1);
  resetButton.style.display = "none";
}

//- Use the player's name in text story.
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text.replace("{playerName}", playerName); // 8. Modify the HTML or text content of at least one element in response to user interaction.

  while (optionButtonsElement.firstChild) {
    //firstChild (3. Use the parent-child-sibling relationship to navigate between elements at least once)
    optionButtonsElement.removeChild(optionButtonsElement.firstChild); // Clear old options
  }

  const fragment = document.createDocumentFragment(); // 7. Use the DocumentFragment interface

  // 4. Iterate over a collection of elements to accomplish some task = forEach
  textNode.options.forEach((option) => {
    // iterate over options array of the current textNode and create buttons
    if (showOption(option)) {
      const button = document.createElement("button"); // 5. Create at least one element using createElement.
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option)); // Add event listener to the button // 11. Register at least two different event listeners and create the associated event handler functions.

      // 10. Modify at least one attribute of an element: Disable a button after clicked.
      button.setAttribute("data-selected", "false");
      button.addEventListener("click", () =>
        button.setAttribute("data-selected", "true")
      );

      fragment.appendChild(button); //6. Use appendChild to add new elements to the DOM:
    }
  });

  optionButtonsElement.appendChild(fragment); // Append the button on the DOM
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return endGame(); // Call the endGame function to handle restart
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

function endGame() {
  textElement.innerText =
    "Thank you for playing, {playerName}! Would you like to play again?";
  resetButton.style.display = "block";
  resetButton.addEventListener("click", startGame);
  // BOM method to show an alert when the game ends.
  alert("Game over!"); // 12. Use at least two Browser Object Model (BOM) properties or methods.
}

const textNodes = [
  {
    id: 1,
    text: "{playerName}, you awaken in a dark spaceship, floating in an unknown sector of space. You notice a strange alien device beside you.",
    options: [
      {
        text: "Take the device",
        setState: { alienDevice: true },
        nextText: 2,
      },
      {
        text: "Leave the device",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text: "You step out into the corridor of the ship and find a robot merchant offering upgrades.",
    options: [
      {
        text: "Trade the alien device for a plasma sword",
        requiredState: (currentState) => currentState.alienDevice,
        setState: { alienDevice: false, plasmaSword: true },
        nextText: 3,
      },
      {
        text: "Trade the alien device for a force shield",
        requiredState: (currentState) => currentState.alienDevice,
        setState: { alienDevice: false, forceShield: true },
        nextText: 3,
      },
      {
        text: "Ignore the robot merchant",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: "As you continue exploring the ship, you arrive at the bridge, where a hostile alien AI confronts you.",
    options: [
      {
        text: "Hack the AI with a nearby terminal",
        nextText: 4,
      },
      {
        text: "Fight the AI with your plasma sword",
        requiredState: (currentState) => currentState.plasmaSword,
        nextText: 5,
      },
      {
        text: "Defend yourself with your force shield",
        requiredState: (currentState) => currentState.forceShield,
        nextText: 6,
      },
      {
        text: "Use the alien device",
        requiredState: (currentState) => currentState.alienDevice,
        nextText: 7,
      },
    ],
  },
  {
    id: 4,
    text: "You fail to hack the AI and it overpowers you. Game over.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 5,
    text: "You slash at the AI with your plasma sword, but it’s too strong for a mere weapon. Game over.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 6,
    text: "Your force shield absorbs the AI’s attacks, but it eventually overloads and fails. Game over.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
  {
    id: 7,
    text: "The alien device emits a pulse, shutting down the AI. You’ve saved the ship and the universe from its tyranny!",
    options: [
      {
        text: "Congratulations! Play Again.",
        nextText: -1,
      },
    ],
  },
];

// Load player's name from localStorage BOM if previously saved
window.addEventListener("load", () => {
  const savedName = localStorage.getItem("playerName"); // 12. Use at least two Browser Object Model (BOM) properties or methods.
  if (savedName) {
    playerName = savedName;
    playerNameInput.value = savedName;
  }
});
