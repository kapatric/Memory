const url = "https://foodish-api.herokuapp.com/api/images/dessert";

// fetch(url)
//   .then((res) => res.json())
//   .then((data) => {
//   console.log(data)
//   })

async function fetchImages() {
  let imagesArr = []
  for (let i = 0; i < 10 ; i++){
    let res = await fetch(url)
    let data = await res.json()
    imagesArr.push(data)
  }
  console.log(imagesArr)
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
console.log(cells)

for (let i = 0; i < cells.length; i++) {
cells[i].draw
}