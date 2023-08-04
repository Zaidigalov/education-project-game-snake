const body = document.querySelector("body"); // Нахожу в разметке элемент body
const container = document.querySelector(".container"); // Нахожу в разметке элемент container
const fieldContainer = container.querySelector(".field__container");
const field = document.createElement("div"); // Создаю div в котором будет поле
fieldContainer.append(field); // Добавляю div в разметку HTML
field.classList.add("field"); // Присваиваю полю класс "field"
const sizeButton = document.querySelector(".size__button");
const sizeList = document.querySelector(".size__list");
const sizeListItem = document.querySelectorAll(".size__list__item");
const restart = document.querySelector(".restart__button");
const restartTitle = document.querySelector(".restart__title");
const checkbox = document.querySelector(".teleport__checkbox");
const checkboxLabel = document.querySelector(".teleport__title");
const checkboxCheked = document.querySelector(".teleport__checkbox_checked");
let score = 0;
finalScore = score;
let record;

if (localStorage.getItem("record") == null) {
  record = 0;
} else {
  record = localStorage.getItem("record");
}
document.querySelector(".record__value").innerText = record;

/* ======= КНОПКА ВЫБОРА РАЗМЕРА ПОЛЯ ================= */
sizeButton.addEventListener("click", function () {
  sizeList.classList.toggle("size__list_visible");
});
document.addEventListener("click", function (e) {
  if (e.target !== sizeButton) {
    sizeList.classList.remove("size__list_visible");
  }
});
sizeListItem.forEach(function (item) {
  item.addEventListener("click", function () {
    sizeButton.innerText = this.innerText;
  });
});

/* ============== РАЗМЕР ПОЛЯ ====================== */

let food;

fieldSize(300, 300, 100);
setCoordinates();
generateSnake();
createFood();

sizeListItem[0].addEventListener("click", () => {
  fieldSize(300, 300, 100);
  setCoordinates();
  generateSnake();
  createFood();
});
sizeListItem[1].addEventListener("click", () => {
  fieldSize(450, 450, 225);
  setCoordinates();
  generateSnake();
  createFood();
});
sizeListItem[2].addEventListener("click", () => {
  fieldSize(600, 600, 400);
  setCoordinates();
  generateSnake();
  createFood();
});

function fieldSize(width, height, cellQty) {
  field.innerHTML = "";
  for (let i = 1; i < cellQty + 1; i++) {
    let cell = document.createElement("div"); // Создаю ячейки
    field.appendChild(cell); // Добавляю ячейки в div с полем
    cell.classList.add("cell"); // Присваиваю ячейкам класс
  }
  field.style.width = width + "px";
  field.style.height = height + "px";

  cells = arguments[2];
  document.querySelector(".instruction").style.display = "block";
  return cells;
}

/* ======= ЗАКРЫТЫЕ СТЕНЫ ============================= */
let check = 1;
checkbox.addEventListener("click", () => {
  if (flag == false) {
    checkboxCheked.classList.toggle("teleport__checkbox_checked_visible");
    field.classList.toggle("field__bordered");
    check++;
  }
});
checkboxLabel.addEventListener("click", () => {
  if (flag == false) {
    checkboxCheked.classList.toggle("teleport__checkbox_checked_visible");
    field.classList.toggle("field__bordered");
    check++;
  }
});

/* =========== ПРИСВОЕНИЕ КООРДИНАТ ЯЧЕЙКАМ ============== */

function setCoordinates() {
  rowLength = cells ** 0.5;
  let x = 1;
  let y = rowLength;
  cell = document.getElementsByClassName("cell");

  for (let i = 0; i < cells; i++) {
    if (x > rowLength) {
      x = 1;
      y = y - 1;
    }
    cell[i].setAttribute("X", x);
    cell[i].setAttribute("Y", y);
    x++;
  }

  return rowLength;
}

/* ========= СОЗДАНИЕ ЗМЕЙКИ ====================== */

function generateSnake() {
  posX = Math.round(rowLength / 2);
  posY = Math.round(rowLength / 2);

  snakeBody = [
    document.querySelector('[X = "' + posX + '"][Y = "' + posY + '"]'),
    document.querySelector('[X = "' + posX + '"][Y = "' + (posY - 1) + '"]'),
  ];
  snakeLength = snakeBody.length;

  for (let i = 0; i < snakeLength; i++) {
    snakeBody[i].classList.add("snake_body");
  }

  snakeBody[0].classList.add("snake_head");
  snakeHead = snakeBody[0];

  return [posX, posY, snakeBody, snakeLength, snakeHead];
}

/* ============ СОЗДАНИЕ ЕДЫ =============== */

function createFood() {
  function generateFood() {
    let posX = Math.ceil(Math.random() * rowLength);
    let posY = Math.ceil(Math.random() * rowLength);
    return [posX, posY];
  }

  coordinatesFood = generateFood();

  food = document.querySelector(
    '[X = "' + coordinatesFood[0] + '"][Y = "' + coordinatesFood[1] + '"]'
  );

  while (food.classList.contains("snake_body") || food.classList.contains("snake_head")) {
    coordinatesFood = generateFood();
    food = document.querySelector(
      '[X = "' + coordinatesFood[0] + '"][Y = "' + coordinatesFood[1] + '"]'
    );
  }

  food.classList.add("food");
}

/* =========== ДВИЖЕНИЕ ЗМЕИ ================ */
let direction = "up";

window.addEventListener("keydown", function (e) {
  if ((e.keyCode == 37 || e.keyCode == 65) && direction !== "right") {
    direction = "left";
  }
  if ((e.keyCode == 38 || e.keyCode == 87) && direction !== "down") {
    direction = "up";
  }
  if ((e.keyCode == 39 || e.keyCode == 68) && direction !== "left") {
    direction = "right";
  }
  if ((e.keyCode == 40 || e.keyCode == 83) && direction !== "up") {
    direction = "down";
  }
});

function move() {
  let snakeCoordinates = [snakeBody[0].getAttribute("X"), snakeBody[0].getAttribute("Y")];

  snakeBody[0].classList.remove("snake_head");

  snakeBody[snakeLength - 1].classList.remove("snake_body");
  snakeBody.pop();

  x = snakeCoordinates[0];
  y = snakeCoordinates[1];

  if (direction == "up") {
    if (y < rowLength) {
      snakeBody.unshift(
        document.querySelector(
          '[X = "' + snakeCoordinates[0] + '"][Y = "' + (+snakeCoordinates[1] + 1) + '"]'
        )
      );
    } else if (y == rowLength && check % 2 !== 0) {
      snakeCoordinates[1] = 0;
      snakeBody.unshift(
        document.querySelector(
          '[X = "' + snakeCoordinates[0] + '"][Y = "' + (+snakeCoordinates[1] + 1) + '"]'
        )
      );
    } else if (y == rowLength && check % 2 == 0) {
      end();
      return;
    }
  } else if (direction == "right") {
    if (x < rowLength) {
      snakeBody.unshift(
        document.querySelector(
          '[X = "' + (+snakeCoordinates[0] + 1) + '"][Y = "' + snakeCoordinates[1] + '"]'
        )
      );
    } else if (x == rowLength && check % 2 !== 0) {
      snakeCoordinates[0] = 0;
      snakeBody.unshift(
        document.querySelector(
          '[X = "' + (+snakeCoordinates[0] + 1) + '"][Y = "' + snakeCoordinates[1] + '"]'
        )
      );
    } else if (x == rowLength && check % 2 == 0) {
      end();
      return;
    }
  } else if (direction == "down") {
    if (y > 1) {
      snakeBody.unshift(
        document.querySelector(
          '[X = "' + snakeCoordinates[0] + '"][Y = "' + (+snakeCoordinates[1] - 1) + '"]'
        )
      );
    } else if (y < rowLength && check % 2 !== 0) {
      snakeCoordinates[1] = rowLength + 1;
      snakeBody.unshift(
        document.querySelector(
          '[X = "' + snakeCoordinates[0] + '"][Y = "' + (+snakeCoordinates[1] - 1) + '"]'
        )
      );
    } else if (y < rowLength && check % 2 == 0) {
      end();
      return;
    }
  } else if (direction == "left") {
    if (x > 1) {
      snakeBody.unshift(
        document.querySelector(
          '[X = "' + (+snakeCoordinates[0] - 1) + '"][Y = "' + snakeCoordinates[1] + '"]'
        )
      );
    } else if (x < rowLength && check % 2 !== 0) {
      snakeCoordinates[0] = rowLength + 1;
      snakeBody.unshift(
        document.querySelector(
          '[X = "' + (+snakeCoordinates[0] - 1) + '"][Y = "' + snakeCoordinates[1] + '"]'
        )
      );
    } else if (x < rowLength && check % 2 == 0) {
      end();
      return;
    }
  }

  snakeBody[0].classList.add("snake_head");

  /* =========== МЕХАНИЗМ СЪЪЕДАНИЯ ЕДЫ ================ */

  head = document.querySelector(".snake_head");
  headCoordinates = [Number(head.getAttribute("x")), Number(head.getAttribute("y"))];

  if (coordinatesFood[0] == headCoordinates[0] && coordinatesFood[1] == headCoordinates[1]) {
    food.classList.remove("food");

    let a = snakeBody[snakeLength - 1].getAttribute("X");
    let b = snakeBody[snakeLength - 1].getAttribute("Y");

    snakeLength++;
    snakeBody.push(document.querySelector('[X="' + a + '"][Y="' + b + '"]'));
    createFood();

    /* ========== СЧЁТ ================== */
    score++;
    finalScore = score;
    document.querySelector(".score__value").innerText = score;

    if (score > record) {
      document.querySelector(".record__value").innerText = score;
    }

    localStorage.setItem("record", document.querySelector(".record__value").innerText);

    /* ========== УСКОРЕНИЕ ================== */
    clearInterval(timerID);
    g = 10;
    speed -= g;
    timerID = setInterval(move, speed);
  }

  /* ====== КОНЕЦ ИГРЫ ========================== */
  cells = document.querySelectorAll(".cell");
  if (snakeBody[0].classList.contains("snake_body") || snakeLength == cells.length) {
    setTimeout(end, speed);
  }
  for (let i = 0; i < snakeLength; i++) {
    snakeBody[i].classList.add("snake_body");
  }
}

let speed = 500;
let flag = false;

window.addEventListener("keydown", function (e) {
  if (
    (e.keyCode == 37 ||
      e.keyCode == 38 ||
      e.keyCode == 39 ||
      e.keyCode == 40 ||
      e.keyCode == 65 ||
      e.keyCode == 87 ||
      e.keyCode == 68 ||
      e.keyCode == 83) &&
    flag == false
  ) {
    flag = true;
    timerID = setInterval(move, speed);
    sizeButton.disabled = true;
    document.querySelector(".instruction").style.display = "none";
    return timerID;
  }
});

restart.addEventListener("click", () => {
  sizeButton.innerText = "МАЛЕНЬКОЕ";
  fieldSize(300, 300, 100);
  setCoordinates();
  generateSnake();
  createFood();
  document.querySelector(".restart").classList.remove("restart_visible");
});

function end() {
  restartTitle.innerText = "Игра окончена :(";
  if (snakeLength == cells.length) {
    restartTitle.innerText = "ПОБЕДА!";
  }

  clearInterval(timerID);
  clearInterval(stop);
  document.querySelector(".restart").classList.add("restart_visible");
  document.querySelector(".restart__score__value").innerText = finalScore;
  document.querySelector(".restart__record__value").innerText =
    document.querySelector(".record__value").innerText;
  score = 0;
  document.querySelector(".score__value").innerText = score;
  flag = false;
  sizeButton.disabled = false;
}
