const url = "https://foodish-api.herokuapp.com/api/images/dessert";
let selected = [];
let imagesArr = []

// fetch(url)
//   .then((res) => res.json())
//   .then((data) => {
//   console.log(data)
//   })

 // ------- Fetching Images ---------
async function fetchImages() {
  for (let i = 0; i < 10 ; i++){
    let res = await fetch(url)
    let data = await res.json()
    imagesArr.push(data)
  }
  // console.log(Array.isArray(imagesArr)),
  //   console.log('imagesArr', imagesArr)
  gridImages()
}

fetchImages()

// ------ Creation of Grid --------
function makeGrid() {
  let tbl = document.getElementById("grid");

  for (let i = 0; i < 4; i++) {
    let myRow = document.createElement("tr");
    console.log(myRow)
    myRow.id = "row" + i;

    tbl.appendChild(myRow);
    let rowW = document.getElementById("row" + i)
    
    for (let j = 0; j < 5; j++){
      let myCell = document.createElement("td");
      myCell.classList = "cell"

      rowW.appendChild(myCell);
    }
  }
}
makeGrid()

let cells = document.querySelectorAll(".cell")
//console.log(cells)

for (let i = 0; i < cells.length; i++) {
cells[i].draw
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClicked));

function handleCellClicked() {
  console.log("Iwas Clicked!")
}

// ------- card image creation ------
function gridImages() {
  console.log(imagesArr)
  for (let i = 0; i < 10; i++) { //picking image at random
    let randomInd = Math.floor(Math.random()* imagesArr.length);
    let face = imagesArr[randomInd]
    // console.log('face', face)
    selected.push(face); // pushing copies 
    selected.push(face);
    imagesArr.splice(randomInd, 1); // removing from array so we don't select twice
    console.log("spliced", imagesArr)
  }
}

