/*-------------------------------- Constants --------------------------------*/

let winningCombos: number[][] = 
[  
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [2, 5, 8],
  [1, 4, 7]
]

/*---------------------------- Variables (state) ----------------------------*/

let board: (number | null)[]
let turn: number
let winner: boolean
let tie: boolean

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll<HTMLElement>(".sqr0, .sqr1, .sqr2, .sqr3, .sqr4, .sqr5, .sqr6, .sqr7, .sqr8")
const messageEl = document.getElementById("message") as HTMLElement
const gameBoardEl = document.querySelector<HTMLElement>(".board")
const resetBtnEl = document.getElementById("btn") as HTMLElement

/*----------------------------- Event Listeners -----------------------------*/

gameBoardEl?.addEventListener('click', handleClick)
resetBtnEl?.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/

init()

function init(): void {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = false
  tie = false
  render()
}

function render(): void {
  updateBoard()
  updateMessage()
}

function updateBoard(): void {
  board.forEach((square: number | null, index: number) => {
    const squareEl = squareEls[index]
    if (square === 1) {
      squareEl.innerText = 'X'
    } else if (square === -1) {
      squareEl.innerText = 'O'
    } else {
      squareEl.innerText = ''
    }
  })
}

function updateMessage(): void {
  if (!winner && !tie) {
    messageEl.textContent = `It's ${turn === 1 ? 'X' : 'O'}'s turn`
  } else if (!winner && tie) {
    messageEl.textContent = 'Tie!'
  } else {
    messageEl.textContent = `${turn === 1 ? 'X' : 'O'} wins`
  }
}


function handleClick(evt: MouseEvent): void {
  const sqIdx = parseInt((evt.target as HTMLElement).id[2])
  if (isNaN(sqIdx) || board[sqIdx] || winner) {
    return
  }
  placePiece(sqIdx)
  checkForTie()
  checkForWinner()
  switchPlayerTurn()
  render()
}

function placePiece(idx: number): void {
  board[idx] = turn
}

function checkForTie(): void {
  if (!board.includes(null)) {
    tie = true
  }
}

function checkForWinner(): void {
  const winningCombos: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [2, 5, 8],
    [1, 4, 7],
  ]

  for (let i = 0; i < winningCombos.length; i++) {
    const [a, b, c] = winningCombos[i]
    if (board[a] === board[b] && board[b] === board[c] && board[a] !== null) {
      winner = true
      return
    }
  }
}

function switchPlayerTurn(): void {
  if (!winner) {
    turn *= -1
  }
}