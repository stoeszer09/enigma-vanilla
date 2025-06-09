const ALPHABET = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",];

const lightPanel = document.querySelector("#light-panel")
ALPHABET.forEach((letter) => {
  const letterDiv = document.createElement("div")
  letterDiv.textContent = letter
  letterDiv.className = "light-bulb"
  letterDiv.id = `light-${letter}`
  lightPanel.appendChild(letterDiv)
})