const x_class = 'x'
const circle_class = 'circle'
const squareElements = document.querySelectorAll('[data-square]')
const board = document.getElementById('board')
const winningMessageElement = document.querySelector('#winningMessage')
const winningMessageText = document.querySelector('[data-winning-message]')
const restartBtn = document.getElementById('restartBtn')
let circleTurn
const victoryMatches = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

restartBtn.addEventListener('click', startGame)

startGame()

function startGame() {
    circleTurn = false
    squareElements.forEach(square => {
        square.classList.remove(x_class)
        square.classList.remove(circle_class)
        square.addEventListener('click', handleclick, { once: true })
    })
    setBoardHover()

    winningMessageElement.classList.remove('show')
}

function handleclick(e) {
    const square = e.target
    const currentClass = circleTurn ? circle_class : x_class
    placemark(square, currentClass)
    if (checkWinner(currentClass)) {
        endgame(false)
    } else if (isDraw()) {
        endgame(true)
    } else {
        switchTurn()
        setBoardHover()
    }
}

//check if there's a Draw or a Winner in the game
function endgame(draw) {
    setTimeout(() => {
        if (draw) {
            winningMessageText.innerText = 'Draw!'
        } else {
            winningMessageText.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
        }

        winningMessageElement.classList.add('show')
    }, 400)
}

function isDraw() {
    return [...squareElements].every(square => {
        return (
            square.classList.contains(x_class) ||
            square.classList.contains(circle_class)
        )
    })
}

//identify wich square is being clicked
function placemark(square, currentClass) {
    square.classList.add(currentClass)
}

//swtich turn between x and circle
function switchTurn() {
    circleTurn = !circleTurn
}

//show the hover effect of who's turn is
function setBoardHover() {
    board.classList.remove(x_class)
    board.classList.remove(circle_class)

    if (circleTurn) {
        board.classList.add(circle_class)
    } else {
        board.classList.add(x_class)
    }
}

//check who's the winner according to the combinations
function checkWinner(currentClass) {
    return victoryMatches.some(matches => {
        return matches.every(index => {
            return squareElements[index].classList.contains(currentClass)
        })
    })
}
