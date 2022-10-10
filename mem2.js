const url = "https://foodish-api.herokuapp.com/api/images/pizza";
let Tile = function (x, y, face) {
  this.x = x;
  this.y = y;
  this.size = 50;
  this.face = face;
  this.isFaceUp = false;
}

Tile.prototype.drawFaceDown = function() {
  fill(214, 247, 202);
  strokeWeight(2);
  rect(this.x, this.y, this.size, this.size, 10);
  image(getImage("avatars/leaf-green"), this.x, this.y, this.size, this.size);
  this.isFaceUp = false;
};

Tile.prototype.isUnderMouse = function(x, y) {
  return x >= this.x && x <= this.x + this.size  &&
      y >= this.y && y <= this.y + this.size;
};

Tile.prototype.drawFaceUp = function () {
  fill(214, 247, 202);
  strokeWeight(2);
  rect(this.x, this.y, this.size, this.size, 10);
  image(this.face, this.x, this.y, this.size, this.size);
  this.isFaceUp = true;



  let selected = [];
  let imagesArr = [];
  let compared = [];
  let cells = [];


  // ------- Fetching Images ---------
  async function fetchImages() {
    for (let i = 0; i < 10; i++) {
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
    
      for (let j = 0; j < 5; j++) {
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



  let numClicked = 0;
  let delayStart = null;
  function handleCellClicked(e) {
    let flipContainer = e.target.parentElement.parentElement
    let flipInnerContainer = e.target.parentElement
    let flip = e.target.parentElement.lastElementChild.lastElementChild.src
  
    for (let i = 0; i < cells.length; i++) {
      let cell = cells[i];
      if (cell.isUnderMouse(mouseX, mouseY)) {
        if (compared.length < 2 && !cell[i].isFaceUp) {
          cells[i].drawFaceUp();
          compared.push(flip);
          if (compared.length === 2) {
            if (compared[0].face === compared[1].face) {
              compared[0].isMatch = true;
              compared[1].isMatch = true;
            }
            delayStart = frameCount;
            loop();
          }
        }
        }
        flipInnerContainer.style.transform = 'rotateX(180deg)';
        cell.isFaceUp = true;
        numClicked++;
      }
    }
  }
      function draw() {
        if (delayStart && (frameCount = delayStart) > 30) {
          for (let i = 0; i < cells.length; i++) {
            cells[i].isFaceUp = false;
          }
          compared = [];
          delayStart = null;
          noLoop();
        }
        for (let i = 0; i < cells.length; i++) {
          cells[i].draw();
        }
      }



      // ------- card image creation && push ------
      function gridImages() {
        //console.log(imagesArr)
        for (let i = 0; i < 10; i++) { //picking image at random
          let randomInd = Math.floor(Math.random() * imagesArr.length);
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
    
  

