/* Defining some constants */
const GRIDWIDTH = 960;
const GRIDHEIGHT = 960;

let userSelection = 16; //default

/* DOM */
const container = document.querySelector('.container');
const clearGrid = document.querySelector('.btn-primary');
const gridSize = document.querySelector('.btn-secondary');
const selector = document.querySelector('#functionSelector')

/* Event listeners */
clearGrid.addEventListener('click', resetGrid);
gridSize.addEventListener('click', getUserSelection);

/* Populate the grid using the userSelection variable with a default value 16 (before actual selection )*/
function populateGrid (n){
    for (let i = 0; i < n * n; i++) {
        let newDiv = document.createElement('div');
        newDiv.style.width = `${GRIDWIDTH / n}px`;
        newDiv.style.height = `${GRIDHEIGHT / n}px`;
        newDiv.style.backgroundColor = "rgba(0,0,0,0.0)";

        newDiv.onmouseover = (e) => selectMode(e);

        container.appendChild(newDiv);       
    }
}  

/* Generate a random number between 0 and 255 */
function rngColorCode() {
    return Math.floor(Math.random() * 256)
}

/* select the color mode to use */
function selectMode(e) {
    switch (selector.value) {
        case "default":
            setDefaultValue(e);
            break;
        case "rgbValues":
            setRGBValue(e);
            break;
        case "grayScale":
            setShadeValueV2(e)
            break;
    }
}

/* set grid cell to default: Black */
function setDefaultValue (e) {
    e.target.style.backgroundColor = `rgba(0,0,0,1)`;
}

/* set grid cell to a random RGB value */
function setRGBValue (e) {
    e.target.style.backgroundColor = `rgba(${rngColorCode()},${rngColorCode()},${rngColorCode()},1)`;
}
/* set individual grid cell shade */
function setShadeValueV1 (e) {
    let regex = /[\d]{1,3}/
    let colorValue = +e.target.style.backgroundColor.match(regex)[0]
    colorValue = (colorValue <= 30) ? colorValue = 0 : colorValue -25; 
    e.target.style.backgroundColor = `rgb(${colorValue},${colorValue},${colorValue})`;
}

function setShadeValueV2 (e) {
    if (e.target.style.backgroundColor != "rgb(0, 0, 0)") {
        let regex = /[\d]\.[\d]/;
        let alpha = +e.target.style.backgroundColor.match(regex);
        e.target.style.backgroundColor = `rgba(0,0,0,${alpha += 0.1})`;
    }
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