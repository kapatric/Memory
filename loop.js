var Tile = function(x, y, face) {
  this.x = x;
  this.y = y;
  this.face = face;
  this.size = 50;
};

Tile.prototype.drawFaceDown = function() {
  fill(214, 247, 202);
  strokeWeight(2);
  rect(this.x, this.y, this.size, this.size, 10);
  image(getImage("avatars/leaf-green"), this.x, this.y, this.size, this.size);
  this.isFaceUp = false;
};

Tile.prototype.drawFaceUp = function() {
  fill(214, 247, 202);
  strokeWeight(2);
  rect(this.x, this.y, this.size, this.size, 10);
  image(this.face, this.x, this.y, this.size, this.size);
  this.isFaceUp = true;
};

Tile.prototype.isUnderMouse = function(x, y) {
  return x >= this.x && x <= this.x + this.size  &&
      y >= this.y && y <= this.y + this.size;
};

// Global config
var NUM_COLS = 5;
var NUM_ROWS = 4;



// Make an array which has 2 of each, then randomize it
var possibleFaces = faces.slice(0);
var selected = [];
for (var i = 0; i < 10; i++) {
  // Randomly pick one from the array of remaining faces
  var randomInd = floor(random(possibleFaces.length));
  var face = possibleFaces[randomInd];
  // Push 2 copies onto array
  selected.push(face);
  selected.push(face);
  // Remove from array
  possibleFaces.splice(randomInd, 1);
}

// Now shuffle the elements of that array
var shuffleArray = function(array) {
  var counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
      // Pick a random index
      var ind = Math.floor(Math.random() * counter);
      // Decrease counter by 1
      counter--;
      // And swap the last element with it
      var temp = array[counter];
      array[counter] = array[ind];
      array[ind] = temp;
  }
};
shuffleArray(selected);

// Create the tiles
var tiles = [];
for (var i = 0; i < NUM_COLS; i++) {
  for (var j = 0; j < NUM_ROWS; j++) {
      var tileX = i * 54 + 10;
      var tileY = j * 54 + 40;
      var tileFace = selected.pop();
      tiles.push(new Tile(tileX, tileY, tileFace));
  }
}

background(255, 255, 255);

// Now draw them face down
for (var i = 0; i < tiles.length; i++) {
  tiles[i].drawFaceDown();
}

var flippedTiles = [];
var delayStartFC = null;

mouseClicked = function() {
  for (var i = 0; i < tiles.length; i++) {
      if (tiles[i].isUnderMouse(mouseX, mouseY)) {
          if (flippedTiles.length < 2 && !tiles[i].isFaceUp) {
              tiles[i].drawFaceUp();
              flippedTiles.push(tiles[i]);
              if (flippedTiles.length === 2) {
                  if (flippedTiles[0].face === flippedTiles[1].face) {
                      flippedTiles[0].isMatch = true;
                      flippedTiles[1].isMatch = true;
                  }
                  delayStartFC = frameCount;
                  loop();
              }
          } 
      }
  }
};

draw = function() {
  if (delayStartFC && (frameCount - delayStartFC) > 30) {
      for (var i = 0; i < tiles.length; i++) {
          if (!tiles[i].isMatch) {
              tiles[i].drawFaceDown();
          }
      }
      flippedTiles = [];
      delayStartFC = null;
      noLoop();
  }
};