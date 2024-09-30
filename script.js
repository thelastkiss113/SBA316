const.textElement = document.getElementById('story')
const optionButtonsElement = document.getElementById('choices')

let state = {}

function startGame() {
 state = {}
 showTextNode(1)
}

function showTextNode(textNodeIndex) {
const textNode = textNodes.find
}

function selectOption(option) {

}





const storyData = [
    {
        text: "You find yourself (in a place) What will you do?",  
        choices: [
            { text: "Go left", nextScene: 1 },
            { text: "Go Right", nextScene: 2 },
            { text: "Go Forward", nextScene: 3 },
            { text: "Defend", nextScene: 4 }
        ]
    },