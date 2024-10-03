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
          nextText: 3,
        },
        {
          text: "Call for help: \"Maybe I should call for backup. Just in case.\"",
          nextText: 4,
        },
        {
          text: "Hide: \"I'm not sure if I want to face whatever's in there.\"",
          nextText: 5,
        },
      ],
    },
    {
      id: 2,
      text: "You open the cargo hold door. A small, green alien is staring at you.",
      options: [
        {
          text: "Scream: \"AAAAAHHHHH! What the heck is that?!\"",
          nextText: 6,
        },
        {
          text: "Talk: \"Hello? Can you understand me?\"",
          nextText: 7,
        },
        {
          text: "Attack: \"I'm not taking any chances. Here's a wrench!\"",
          nextText: 8,
        },
        {
          text: "Befriend: \"Hey there, little guy. Want a snack?\"",
          nextText: 9,
        },
      ],
    },
    {
      id: 9,
      text: "The alien takes the food and seems to calm down.",
      options: [
        {
          text: "Ask questions: \"Where are you from? What are you doing here?\"",
          nextText: 10,
        },
        {
          text: "Play: \"Let's play tag! I'll be the spaceship, and you can be the little green guy.\"",
          nextText: 11,
        },
        {
          text: "Give more food: \"Here's some more. You look hungry.\"",
          nextText: 12,
        },
        {
          text: "Leave: \"I think I've had enough excitement for one day.\"",
          nextText: 13,
        },
      ],
    },
    {
      id: 10,
      text: "The alien communicates using a strange language, but you can understand some of it.",
      options: [
        {
          text: "Ask about its home: \"So, where do you come from? A planet of green aliens?\"",
          nextText: 14,
        },
        {
          text: "Ask about its purpose: \"What are you doing on this ship? Are you lost?\"",
          nextText: 15,
        },
        {
          text: "Ask about its friends: \"Do you have any friends back home? Or are you alone?\"",
          nextText: 16,
        },
        {
          text: "Offer to help: \"Hey, I could help you. If you need it.\"",
          nextText: 17,
        },
      ],
    },
    {
      id: 17,
      text: "The alien seems interested in your offer.",
      options: [
        {
          text: "Help it find its way home: \"Let's get you back to your planet. We can fix this ship.\"",
          nextText: 18,
        },
        {
          text: "Help it fix the ship: \"I'm a bit of a mechanic. Maybe I can help you fix this thing.\"",
          nextText: 19,
        },
        {
          text: "Help it learn about humans: \"I can teach you about Earth. We're pretty cool, actually.\"",
          nextText: 20,
        },
        {
          text: "Just be friends: \"Hey, we could just be friends. You seem like a good guy.\"",
          nextText: 21,
        },
      ],
    },
    {
      id: 18,
      text: "The alien agrees to your plan.",
      options: [
        {
          text: "Fix the ship: \"Let's get to work. We've got a long journey ahead.\"",
          nextText: 22,
        },
        {
          text: "Find a map: \"Maybe there's a map somewhere on this ship.\"",
          nextText: 23,
        },
        {
          text: "Contact someone: \"We should try to contact someone. Maybe they can help.\"",
          nextText: 24,
        },
        {
          text: "Wait for rescue: \"Maybe someone will find us. We just have to wait.\"",
          nextText: 25,
        },
      ],
    },
    {
      id: 22,
      text: "You find a toolkit and start working on the ship.",
      options: [
        {
          text: "Fix the power system: \"If we can get the power working, we might be able to fix the ship.\"",
          nextText: 26,
        },
        {
          text: "Repair the navigation system: \"We need to find out where we are. Can you help me with this?\"",
          nextText: 27,
        },
        {
          text: "Check the life support: \"We need to make sure we have enough air. Let's check the life support.\"",
          nextText: 28,
        },
        {
          text: "Wait for help: \"Maybe we should just wait for someone to find us.\"",
          nextText: 29,
        },
      ],
    },
    {
      id: 26,
      text: "You successfully repair the power system.",
      options: [
        {
          text: "Try the navigation system: \"Let's see if this thing is working now.\"",
          nextText: 27,
        },
        {
          text: "Check the life support: \"Just to be sure, let's check the life support.\"",
          nextText: 28,
        },
        {
          text: "Contact someone: \"We should try to contact someone. Maybe they can help.\"",
          nextText: 24,
        },
        {
          text: "Wait for rescue: \"Maybe we should just wait for someone to find us.\"",
          nextText: 25,
        },
      ],
    },
    {
      id: 27,
      text: "The navigation system is still broken.",
      options: [
        {
          text: "Repair the navigation system: \"We've got to fix this thing. Any ideas?\"",
          nextText: 30,
        },
        {
          text: "Check the life support: \"Just to be sure, let's check the life support.\"",
          nextText: 28,
        },
        {
          text: "Contact someone: \"We should try to contact someone. Maybe they can help.\"",
          nextText: 24,
        },
        {
          text: "Wait for rescue: \"Maybe we should just wait for someone to find us.\"",
          nextText: 25,
        },
      ],
    },
    {
      id: 30,
      text: "You successfully repair the navigation system.",
      options: [
        {
          text: "Contact someone: \"Let's try to contact someone. We might be able to get help.\"",
          nextText: 24,
        },
        {
          text: "Wait for rescue: \"Maybe we should just wait for someone to find us.\"",
          nextText: 25,
        },
      ],
    },
    {
      id: 24,
      text: "You manage to contact another ship.",
      options: [
        {
          text: "Ask for help: \"We're in trouble. Can you help us?\"",
          nextText: 31,
        },
        {
          text: "Wait for a response: \"Hopefully, they'll answer soon.\"",
          nextText: 32,
        },
      ],
    },
    {
      id: 31,
      text: "The other ship agrees to help.",
      options: [
        {
          text: "Wait for rescue: \"Now we just have to wait for them to get here.\"",
          nextText: 25,
        },
      ],
    },
    {
      id: 25,
      text: "The other ship arrives and rescues you and the alien.",
      options: [
        {
          text: "Celebrate: \"We did it! We're safe!\"",
          nextText: 33,
        },
        {
          text: "Say goodbye: \"Thanks for everything. It was fun.\"",
          nextText: 34,
        },
        {
          text: "Continue your adventure: \"Hey, maybe we could go on another adventure together.\"",
          nextText: 35,
        },
      ],
    },
    {
      id: 33,
      text: "You and the alien celebrate your successful escape!",
      options: [],
    },
    {
      id: 34,
      text: "You say goodbye to the alien and part ways, grateful for the adventure.",
      options: [],
    },
    {
      id: 35,
      text: "You decide to go on another adventure together with the alien.",
      options: [],
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
