const url = "https://foodish-api.herokuapp.com/api/images/pizza";
let selected = [];
let imagesArr = [];
let compared = [];
let numClicked = 1;

 // ------- Fetching Images ---------
async function fetchImages() {
  for (let i = 0; i < 10 ; i++){
    let res = await fetch(url)
    let data = await res.json()
    imagesArr.push(data)
  }
  
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



function handleCellClicked(e) {
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
    compared[0] === compared[1]
    console.log("Not a match!")
    compared = []
flipInnerContainer.style.transform = 'rotateX(360deg)'
   // flipContainer.style.transform = 'rotateX(360deg)' // flipping back cells
  }
  
  console.log(compared)
  console.log(compared[0])
  
}


// ------- card image creation && push ------
function gridImages() {
  //console.log(imagesArr)
  for (let i = 0; i < 10; i++) { //picking image at random
    let randomInd = Math.floor(Math.random()* imagesArr.length);
    let face = imagesArr[randomInd]
    selected.push(face); // pushing copies 
    selected.push(face);
    imagesArr.splice(randomInd, 1); // removing from array so we don't select twice
  
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

// --------------
