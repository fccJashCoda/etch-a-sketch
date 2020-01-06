/* Defining some constants */
const GRIDWIDTH = 960;
const GRIDHEIGHT = 960;

let userSelection = 16; //default

/* DOM */
const container = document.querySelector('.container');
const clearGrid = document.querySelector('.btn-primary');
const gridSize = document.querySelector('.btn-secondary');

/* Event listeners */
clearGrid.addEventListener('click', resetGrid);
gridSize.addEventListener('click', getUserSelection);

/* Populate the grid using the userSelection variable with a default value 16 (before actual selection )*/
function populateGrid (n){
    for (let i = 0; i < n * n; i++) {
        let newDiv = document.createElement('div');
        newDiv.style.width = `${GRIDWIDTH / n}px`;
        newDiv.style.height = `${GRIDHEIGHT / n}px`;
        newDiv.style.backgroundColor = "#fff";

        newDiv.onmouseover = (e) => setShadeValue(e);


        container.appendChild(newDiv);       
    }
}  

/* Generate a random number between 0 and 255 */
function rngColorCode() {
    return Math.floor(Math.random() * 256)
}

/* set default color to Black */
function setDefaultValue (e) {
    e.target.style.backgroundColor = `rgb(0,0,0)`;
}

/* set grid block to a random RGB value */
function setRGBValue (e) {
    e.target.style.backgroundColor = `rgb(${colorValue},${colorValue},${colorValue})`;
}
/* set individual grid block shade */
function setShadeValue(e) {
    let regex = /[\d]{1,3}/
    let colorValue = +e.target.style.backgroundColor.match(regex)[0]
    colorValue = (colorValue <= 30) ? colorValue = 0 : colorValue -25; 
    e.target.style.backgroundColor = `rgb(${colorValue},${colorValue},${colorValue})`;
}

/* get user selection, let the user choose a grid size with a max value of 128 */
function getUserSelection () {
    let selection = prompt('Enter desired Grid size: (min 16 - max 128)');
    if (selection < 16 || selection > 128) {
        getUserSelection()
    } else {
        userSelection = selection
    } 
    resetGrid()
}

/* Reset the grid, build a fresh white board */
function resetGrid () {
    container.innerHTML = "";
    populateGrid(userSelection);
}

populateGrid(16)