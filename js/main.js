const ALPHABET = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
const TOP_ROW_LETTERS = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const MIDDLE_ROW_LETTERS = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const BOTTOM_ROW_LETTERS = ["Z", "X", "C", "V", "B", "N", "M"];
const ROTOR_I = { type: "I",}
const ROTOR_II = { type: "II",}
const ROTOR_III = { type: "III",}

const lightPanel = document.querySelector("#light-panel")
const topRowContainer = document.querySelector("#top-row-lights")
const middleRowContainer = document.querySelector("#middle-row-lights")
const bottomRowContainer = document.querySelector("#bottom-row-lights")

function createLetterDivs(letterArray, letterContainer, rowClassName) {
  letterArray.forEach(letter => {
    const letterDiv = document.createElement("div")
    letterDiv.textContent = letter
    letterDiv.className = `light-bulb ${rowClassName}`
    letterDiv.id = `light-${letter}`
    letterContainer.appendChild(letterDiv)
  })
}

const activeRotors = [
  {rotorType: ROTOR_I, position: "A"},
  {rotorType: ROTOR_II, position: "A"},
  {rotorType: ROTOR_III, position: "A"},
]

createLetterDivs(TOP_ROW_LETTERS, topRowContainer, "top-row-letter")
createLetterDivs(MIDDLE_ROW_LETTERS, middleRowContainer, "middle-row-letter")
createLetterDivs(BOTTOM_ROW_LETTERS, bottomRowContainer, "bottom-row-letter")

const rotorSlot1 = document.querySelector("#rotor-slot-1")
const rotorSlot2 = document.querySelector("#rotor-slot-2")
const rotorSlot3 = document.querySelector("#rotor-slot-3")

function displaySingleRotor(rotorSlotElement, rotorData, slotIndex) {
  rotorSlotElement.innerHTML = ""

  const rotorSelectionDiv = document.createElement('div')
  rotorSelectionDiv.textContent = `Rotor ${rotorData.rotorType.type}`
  rotorSelectionDiv.classList.add('rotor-type-display')
  rotorSlotElement.appendChild(rotorSelectionDiv)

  const currentPositionDiv = document.createElement('div')
  currentPositionDiv.classList.add()
  currentPositionDiv.textContent = rotorData.position
  currentPositionDiv.id = `rotor-position-${slotIndex + 1}`
  rotorSlotElement.appendChild(currentPositionDiv)
}

displaySingleRotor(rotorSlot1, activeRotors[0], 0)
displaySingleRotor(rotorSlot2, activeRotors[1], 1)
displaySingleRotor(rotorSlot3, activeRotors[2], 2)