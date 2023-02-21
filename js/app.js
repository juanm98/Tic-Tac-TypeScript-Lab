"use strict";
/*-------------------------------- Constants --------------------------------*/
let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7]
];
/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll(".sqr0, .sqr1, .sqr2, .sqr3, .sqr4, .sqr5, .sqr6, .sqr7, .sqr8");
const messageEl = document.getElementById("message");
const gameBoardEl = document.querySelector(".board");
const resetBtnEl = document.getElementById("btn");
/*----------------------------- Event Listeners -----------------------------*/
gameBoardEl?.addEventListener('click', handleClick);
resetBtnEl?.addEventListener('click', init);
/*-------------------------------- Functions --------------------------------*/
init();
function init() {
    board = [null, null, null, null, null, null, null, null, null];
    turn = 1;
    winner = false;
    tie = false;
    render();
}
function render() {
    updateBoard();
    updateMessage();
}
function updateBoard() {
    board.forEach((square, index) => {
        const squareEl = squareEls[index];
        if (square === 1) {
            squareEl.innerText = 'X';
        }
        else if (square === -1) {
            squareEl.innerText = 'O';
        }
        else {
            squareEl.innerText = '';
        }
    });
}
function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn`;
    }
    else if (!winner && tie) {
        messageEl.textContent = 'Tie!';
    }
    else {
        messageEl.textContent = `${turn === 1 ? 'X' : 'O'} wins`;
    }
}
