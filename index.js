const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');

startGame();
addResetListener();

let currentPlayer = ZERO;

let arr = [[EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
];

function checkWinner() {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === arr[i][1] === arr[i][2] !== EMPTY) {
            return arr[i][0];
        }
        if (arr[0][i] === arr[1][i] === arr[2][i] !== EMPTY) {
            return arr[i][0];
        }
    }

    if (arr[0][0] === arr[1][1] === arr[2][2] !== EMPTY) {
        return arr[0][0];
    }

    if (arr[2][0] === arr[1][1] === arr[0][2] !== EMPTY) {
        return arr[0][0];
    }

    return EMPTY;
}


function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler(row, col) {
    let cell = findCell(row, col);
    if (cell.textContent === EMPTY) {
        renderSymbolInCell(currentPlayer, row, col);
        currentPlayer = (currentPlayer !== ZERO) ? ZERO : CROSS;
    }
    console.log(`Clicked on cell: ${row}, ${col}`);
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
