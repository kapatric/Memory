const url = "https://foodish-api.herokuapp.com/api/images/pizza";
let selected = [];
let imagesArr = [];
let compared = [];
let numClicked = 1;

// fetch(url)
//   .then((res) => res.json())
//   .then((data) => {
//   console.log(data)
//   })
//console.log(imagesArr)

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
  shuffleSelected()
  makeGrid()
}

fetchImages()

// ------ Creation of Grid --------
function makeGrid() {
  let tbl = document.getElementById("grid");
  let index = 0;

  for (let i = 0; i < 4; i++) {
    let myRow = document.createElement("tr");

   // console.log(myRow)
    myRow.id = "row" + i;

    tbl.appendChild(myRow);
    let rowW = document.getElementById("row" + i)
    
    for (let j = 0; j < 5; j++){
      let myCell = document.createElement("td");
      myCell.classList = "cell"
      myCell.addEventListener("click", handleCellClicked)
  //------ send images to cells    
      let cardHTML = `
      <div class="flip-card">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          
        </div>
        <div class="flip-card-back">
        <img src="${selected[index].image}" alt="Avatar" style="width:100px;height:100px;">
        </div>
      </div>
    </div>
      `
      index++
      myCell.insertAdjacentHTML("beforeend", cardHTML)
      rowW.appendChild(myCell);
    }
  }
}
// makeGrid()

// let cells = document.querySelectorAll(".cell")
// console.log(cells)


// cells.forEach((cell) => cell.addEventListener("click", handleCellClicked));

function handleCellClicked(e) {
  //console.log("I was Clicked!")
  //console.log(e.target.parentElement.parentElement)
  //console.log(e.target.parentElement)
  let flipContainer = e.target.parentElement.parentElement
  let flipInnerContainer = e.target.parentElement
  let flip = e.target.parentElement.lastElementChild.lastElementChild.src
  

  if (compared.length < 2) {
   // flipContainer.style.transform = 'rotateX(180deg)'; // flipping cells
    flipInnerContainer.style.transform = 'rotateX(180deg)';
    compared.push(flip)
    compared[0] != compared[1]
    numClicked++
  } else {
    flipInnerContainer.style.transform = 'rotateX(360deg)'
    compared[0] === compared[1]
    console.log("Not a match!")
    compared = []

   // flipContainer.style.transform = 'rotateX(360deg)' // flipping back cells
   
    //console.log(flipContainer)
  }
  
  console.log(compared)
  console.log(compared[0])
  
  //flipContainer.style.transform = 'rotateX(180deg)'; // flipping cells
//flipInnerContainer.style.transform = 'rotateX(180deg)';

}


// ------- card image creation && push ------
function gridImages() {
  //console.log(imagesArr)
  for (let i = 0; i < 10; i++) { //picking image at random
    let randomInd = Math.floor(Math.random()* imagesArr.length);
    let face = imagesArr[randomInd]
    // console.log('face', face)
    selected.push(face); // pushing copies 
    selected.push(face);
    imagesArr.splice(randomInd, 1); // removing from array so we don't select twice
  //  console.log("spliced", imagesArr)
    
    //console.log(imagesArr)
  }
}

//------- Randomize selected images ------
function shuffleSelected() {
  let currentIndex = selected.length, randomIndex;
//console.log(currentIndex)
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [selected[currentIndex], selected[randomIndex]] = [
      selected[randomIndex], selected[currentIndex]];
  }
  return selected;
}

//console.log(selected)

// --------------
