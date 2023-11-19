// FILAS TABLERO

const createRows = () => {

    let board = document.getElementById("game");

    let mainCol = document.createElement("div");
    mainCol.className = "col-12 d-flex justify-content-center justify-content-lg-start eachRow";
  
    let squaresDiv = document.createElement("div");
    squaresDiv.className = "d-flex justify-content-evenly align-items-center";

    for (let i = 0; i < 4; i++) {
        let eachSquare = document.createElement("div");
        eachSquare.className = "squareGame";
        squaresDiv.appendChild(eachSquare)
    }

    let circlesDiv = document.createElement("div");
    circlesDiv.className = "d-flex justify-content-evenly align-items-center";

    for (let i = 0; i < 4; i++) {
        let eachCircle = document.createElement("div");
        eachCircle.className = "circle m-1";
        circlesDiv.appendChild(eachCircle)
    }

    mainCol.appendChild(squaresDiv);
    mainCol.appendChild(circlesDiv);
    board.appendChild(mainCol);
};

// DEFINIR FILAS TABLERO 

let howMany = 0;

const howManyRows = () => {
    
    if (selectedLevel == "beginnerRow") {
        for (let i = 0; i < 10; i++) {
            createRows();
        }
        return howMany = 10;
    } else if (selectedLevel == "intermediateRow") {
        for (let i = 0; i < 8; i++) {
            createRows();
        }
        return howMany = 8;
    } else {
        for (let i = 0; i < 6; i++) {
            createRows();
        }
        return howMany = 6;
    }
}

howManyRows();

// ID CUADRADOS

let rows = document.getElementsByClassName("eachRow");
let arrayRows = Array.from(rows);

const addIdToRows = () => {
    for (let i = 0; i < arrayRows.length; i++) {
        let element = arrayRows[i];
        element.id = `eachRow${i}`;
    }
}

// CIRCULOS

const addIdToSquares = () => {

    let squares = document.getElementsByClassName("squareGame");
    let arraySquares = Array.from(squares);

    for (let j = 0; j < howMany; j++){

        for (let i = 0; i < 4; i++) {

            let index = j * 4 + i;
            let element = arraySquares[index];
            element.id = `row${j}-square${i}`;
        }
    };
}

// NIVEL ELEGIDO

const addIdToCircles = () => {

    let circles = document.getElementsByClassName("circle");
    let arrayCircles = Array.from(circles);


    for (let j = 0; j < howMany; j++){

        for (let i = 0; i < 4; i++) {

            let index = j * 4 + i;
            let element = arrayCircles[index];
            element.id = `row${j}-circle${i}`;
        }
    };

}

addIdToRows();
addIdToSquares();
addIdToCircles();

// COLORES ELEGIOS


const colourMiniSquares = () => {

    for (i = 0; i < arrayChosenColours.length; i++) {
        let miniSquare = document.getElementById(`${i}`);
        miniSquare.style.backgroundColor = arrayChosenColours[i];
    }
}

colourMiniSquares();


// RESPUESTA ALEATORIA

let randomAnswerArray = [];

const correctAnswer = () => {

    for (i = 0; i < 4; i++) {
        random = Math.floor(Math.random() * (arrayChosenColours.length));
        randomAnswerArray.push(arrayChosenColours[random]);
    }
}

correctAnswer();


// COLOREAR CUADROS

let chosenColoursInRow = [];

// AGREGAR COLOR EN MATRIZ

const addColour = (id) => {
    let colour = arrayChosenColours[id];
    chosenColoursInRow.push(colour);
    paintSquares();
}

// PINTAR LOS CUADROS USANDO EL INDICE

let j = 0;
let squareIwantToPaint;

const paintSquares = () => {

        for (let i = 0; i < 4; i++) {
            squareIwantToPaint = document.getElementById(`row${j}-square${i}`);
            let colourChosen = chosenColoursInRow[i];
            squareIwantToPaint.style.backgroundColor = colourChosen;
        }
}

// ELIMINA COLORES ELEGIDOS DEL ARRAY

const removeFromArray = () => {

    index = chosenColoursInRow.length - 1;
    chosenColoursInRow.pop();

    if(chosenColoursInRow.length <= 4){
        squareIwantToPaint = document.getElementById(`row${j}-square${index}`);
        squareIwantToPaint.style.backgroundColor = "";
    }

};


//COMPARA COLORES ELEGIDOS CON RESPUESTA CORRECTA

const compareColours = () => {
    if (chosenColoursInRow.length >= 4){

        arrayCircles = chosenColoursInRow.map((element, index) => {

            if (element === randomAnswerArray[index]) {
                return "rgb(138, 43, 226)";
            } else if (randomAnswerArray.includes(element)){
                return "rgb(255, 255, 255)";
            } else {
                return "";
            }
        })

        paintCircles();
        check();

    } 
}

//PINTA CICLOS

const paintCircles = () => {
    for (let i = 0; i < 4; i++) {
        let circleIwantToPaint = document.getElementById(`row${j}-circle${i}`);
        let paintAnswer = arrayCircles[i];
        circleIwantToPaint.style.backgroundColor = paintAnswer;
    }
}


// CAMBIA LAS FILAS POR LA RESPUESTA

const check = (showWinnerPage) => {

    if (j < (howMany - 1)) {
        j++;
        chosenColoursInRow.length = "";
    } else {
        sessionStorage.setItem("result", "loser");
        window.location.href = "./result.html";
    }
}


// VERIFICAR RESULTADO

const winner = (showWinnerPage) => {

    let stringArrayCircles = arrayCircles.toString();
    let correctAnswer = "rgb(138, 43, 226),rgb(138, 43, 226),rgb(138, 43, 226),rgb(138, 43, 226)";
 
     if(stringArrayCircles === correctAnswer){
 
         sessionStorage.setItem("result", "winner");
         window.location.href = "./result.html";
     }
 }