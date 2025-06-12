const ALPHABET = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];
const TOP_ROW_LETTERS = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const MIDDLE_ROW_LETTERS = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const BOTTOM_ROW_LETTERS = ["Z", "X", "C", "V", "B", "N", "M"];
const ROTOR_I = { 
  type: "I", 
  notch: "Q",
  wiring: 
    {A: "E", B: "K", C: "M", D: "F", E: "L", F: "G", G: "D", H: "Q", I: "V", J: "Z", K: "N", L: "T", M: "O", N: "W", O: "Y", P: "H", Q: "X", R: "U", S: "S", T: "P", U: "A", V: "I", W: "B", X: "R", Y: "C", Z: "J"},
}
const ROTOR_II = { 
  type: "II",
  notch: "E", 
  wiring: 
    {A: "A", B: "J", C: "D", D: "K", E: "S", F: "I", G: "R", H: "U", I: "X", J: "B", K: "L", L: "H", M: "W", N: "T", O: "M", P: "C", Q: "Q", R: "G", S: "Z", T: "N", U: "P", V: "Y", W: "F", X: "V", Y: "O", Z: "E"},
}
const ROTOR_III = { 
  type: "III",
  notch: "V",
  wiring: 
    {  A: "B", B: "D", C: "F", D: "H", E: "J", F: "L", G: "C", H: "P", I: "R", J: "T", K: "X", L: "V", M: "Z", N: "N", O: "Y", P: "E", Q: "I", R: "W", S: "G", T: "A", U: "K", V: "M", W: "U", X: "S", Y: "Q", Z: "O"},
}
let keyIsDown = false

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

function rotorOutput (input) {
  let output = ""
  for (let i = 0; i < 3; i++) {
    output = activeRotors[i].rotorType.wiring[input]
    input = output
  }
  for (let i = 2; i >= 0; i--) {
    output = activeRotors[i].rotorType.wiring[input]
    input = output
  }
  return output
}

document.addEventListener("keydown", e => {
  if (keyIsDown) return
  const pressedKey = e.key.toUpperCase()
  if (ALPHABET.includes(pressedKey)) {
    keyIsDown = true
    e.preventDefault()

    const output = rotorOutput(pressedKey)
    
    const lightElementID = `light-${output}`
    const lightElement = document.getElementById(lightElementID)
    
    if (lightElement) {
      lightElement.classList.add("active")
    }
  }
})
document.addEventListener("keyup", e => {
  e.preventDefault()
  const releasedKey = e.key.toUpperCase()
  if (ALPHABET.includes(releasedKey)) {
    const output = rotorOutput(releasedKey)

    const lightElementID = `light-${output}`
    const lightElement = document.getElementById(lightElementID)
    
    if (lightElement && lightElement.classList.contains("active")) {
      lightElement.classList.remove("active")
      keyIsDown = false
    }
  }
})