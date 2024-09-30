const textElement = document.getElementById('text')  //cache at least one element using getElementByID #text #options-buttons
const optionButtonsElement = document.querySelector('#option-buttons') // Cache at least one element using querySelector

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild) ///Use parent-child-sibling relationships to navigate between elements
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You awaken in a dark spaceship, floating in an unknown sector of space. You notice a strange alien device beside you.',
    options: [
      {
        text: 'Take the device',
        setState: { alienDevice: true },
        nextText: 2
      },
      {
        text: 'Leave the device',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You step out into the corridor of the ship and find a robot merchant offering upgrades.',
    options: [
      {
        text: 'Trade the alien device for a plasma sword',
        requiredState: (currentState) => currentState.alienDevice,
        setState: { alienDevice: false, plasmaSword: true },
        nextText: 3
      },
      {
        text: 'Trade the alien device for a force shield',
        requiredState: (currentState) => currentState.alienDevice,
        setState: { alienDevice: false, forceShield: true },
        nextText: 3
      },
      {
        text: 'Ignore the robot merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'As you continue exploring the ship, you arrive at the bridge, where a hostile alien AI confronts you.',
    options: [
      {
        text: 'Hack the AI with a nearby terminal',
        nextText: 4
      },
      {
        text: 'Fight the AI with your plasma sword',
        requiredState: (currentState) => currentState.plasmaSword,
        nextText: 5
      },
      {
        text: 'Defend yourself with your force shield',
        requiredState: (currentState) => currentState.forceShield,
        nextText: 6
      },
      {
        text: 'Use the alien device',
        requiredState: (currentState) => currentState.alienDevice,
        nextText: 7
      }
    ]
  },
  {
    id: 4,
    text: 'You fail to hack the AI and it overpowers you. Game over.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You slash at the AI with your plasma sword, but it’s too strong for a mere weapon. Game over.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'Your force shield absorbs the AI’s attacks, but it eventually overloads and fails. Game over.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 7,
    text: 'The alien device emits a pulse, shutting down the AI. You’ve saved the ship and the universe from its tyranny!',
    options: [
      {
        text: 'Congratulations! Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()
