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

