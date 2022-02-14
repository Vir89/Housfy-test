let positionX = 0;
let positionY = 0;

function initPlanetCoordinates() {
  let table = document.getElementById("coordinates");
  for (let y = 50; y >= -50; y--) {
    let tr = document.createElement("tr");
    for (let x = -50; x <= 50; x++) {
      let td = document.createElement("td");
      td.setAttribute("id", x + "," + y);
      td.innerHTML = "&nbsp;";
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

function initPosition(x, y) {
  positionX = x;
  positionY = y;
  paintCell();
}

function sendCommand() {
  let keepMooving = true;
  let command = document.getElementById("commandText").value;
  if (command != null && command.trim() != "") {
    for (let i = 0; i < command.length && keepMooving; i++) {
      let paramX = positionX;
      let paramY = positionY;
      if (command[i].toUpperCase() == "F") {
        paramY = positionY + 1;
      } else if (command[i].toUpperCase() == "L") {
        paramX = positionX - 1;
      } else if (command[i].toUpperCase() == "R") {
        paramX = positionX + 1;
      }
      keepMooving = refreshPosition(paramX, paramY);
    }
  }
}

function refreshPosition(newX, newY) {
  let keepMooving = false;
  if (newX > 50 || newX < -50 || newY > 50 || newY < -50) {
    document.getElementById("msgInfo").innerHTML =
      "The rover reached the map limit.";
  } else if (
    document.getElementById(newX + "," + newY).style.backgroundColor == "grey"
  ) {
    document.getElementById("msgInfo").innerHTML =
      "There is an obstacle in position (" + newX + "," + newY + ")";
  } else {
    document.getElementById("msgInfo").innerHTML = "";
    resetCell();
    positionX = newX;
    positionY = newY;
    paintCell();
    keepMooving = true;
  }
  return keepMooving;
}

function resetCell() {
  document.getElementById(positionX + "," + positionY).innerHTML = "&nbsp;";
  document.getElementById(positionX + "," + positionY).style.backgroundColor =
    "unset";
}

function paintCell() {
  //document.getElementById(positionX + "," + positionY).innerHTML = "R";
  document.getElementById(positionX + "," + positionY).style.backgroundColor =
    "gold";
  document.getElementById("currentPosition").innerHTML =
    positionX + "," + positionY;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateObstacles(n) {
  for (let i = 0; i < n; i++) {
    let posX = getRndInteger(-49, 49);
    let posY = getRndInteger(-49, 49);
    //document.getElementById(posX + "," + posY).innerHTML = "O";
    document.getElementById(posX + "," + posY).style.backgroundColor = "grey";
  }
}

initPlanetCoordinates();

initPosition(getRndInteger(-49, 49), getRndInteger(-49, 49));

generateObstacles(1000);
