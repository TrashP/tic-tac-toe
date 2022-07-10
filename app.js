const gameBoard = (() => {
    const gameSquares = [];

    const createSquares = () => {
        for (let i = 0; i < 9; i++) {
            let square = document.createElement('div');
            square.setAttribute('class', 'square');
            let board = document.getElementsByClassName('gameBoard');
            board[0].appendChild(square);
            gameSquares.push(square);
            
            const playerOne = document.getElementById('one');
            playerOne.setAttribute('class', 'selected');

            square.addEventListener('click', function() {
                square.innerHTML = displayController.changePiece();
                displayController.changeMarkers();
                displayController.changePlayers();
                gameLogic.gameWinner();
            })
        }
    }    

    return {createSquares};
})();

const displayController = (() => {
    let playerPiece = 'x';

    const playerOnePiece = () => {
        const markers = document.getElementsByClassName('markers');
        markers[0].setAttribute('class', 'markers selected');
        markers[1].addEventListener('click', function() {
            markers[1].setAttribute('class', 'markers selected');
            markers[0].setAttribute('class', 'markers');
        })
        markers[0].addEventListener('click', function() {
            markers[0].setAttribute('class', 'markers selected');
            markers[1].setAttribute('class', 'markers');
        })
    }   

    const changePiece = () => {
        const markers = document.getElementsByClassName('markers');
        if (markers[1].classList.contains('selected')) {
            playerPiece = 'o';
        }
        if (markers[0].classList.contains('selected')) {
            playerPiece = 'x';
        }
        return playerPiece;
    }

    const changeMarkers = () => {
        const markers = document.getElementsByClassName('markers');
        if (markers[0].classList.contains('selected')) {
            markers[1].setAttribute('class', 'markers selected');
            markers[0].setAttribute('class', 'markers');
        }                 
        else if (markers[1].classList.contains('selected')) {
            markers[0].setAttribute('class', 'markers selected');
            markers[1].setAttribute('class', 'markers');
        }
    }

    const changePlayers = () => {
        const playerOne = document.getElementById('one');
        const playerTwo = document.getElementById('two');

        if (playerOne.classList.contains('selected')) {
            playerOne.setAttribute('class', '');
            playerTwo.setAttribute('class', 'selected');
        }
        else if (playerTwo.classList.contains('selected')) {
            playerTwo.setAttribute('class', '');
            playerOne.setAttribute('class', 'selected');
        }
    }

    const resultDisplayer = (text) => {
        let board = document.getElementsByClassName('gameBoard');
            let con = document.getElementsByClassName('container');
            let control = document.getElementsByClassName('controllers')
            
            let resultDisplay = document.createElement('div');
            resultDisplay.setAttribute('class', 'displayResult');
            con[0].appendChild(resultDisplay);
            resultDisplay.innerHTML = `${text}`;
            board[0].setAttribute('class', 'gameBoard playerOneWins');
            control[0].setAttribute('class', 'controllers playerOneWins');
    }

    return {playerOnePiece, changePiece, changeMarkers, changePlayers, resultDisplayer}; 
})();

const gameLogic = (() => {

    const gameWinner = () => {
        const s = document.getElementsByClassName('square');

        if (s[0].innerHTML == 'x' && s[1].innerHTML == 'x' && s[2].innerHTML == 'x'
        || s[3].innerHTML == 'x' && s[4].innerHTML == 'x' && s[5].innerHTML == 'x'
        || s[6].innerHTML == 'x' && s[7].innerHTML == 'x' && s[8].innerHTML == 'x'
        || s[0].innerHTML == 'x' && s[3].innerHTML == 'x' && s[6].innerHTML == 'x'
        || s[1].innerHTML == 'x' && s[4].innerHTML == 'x' && s[7].innerHTML == 'x'
        || s[2].innerHTML == 'x' && s[5].innerHTML == 'x' && s[8].innerHTML == 'x'
        || s[0].innerHTML == 'x' && s[4].innerHTML == 'x' && s[8].innerHTML == 'x'
        || s[2].innerHTML == 'x' && s[4].innerHTML == 'x' && s[6].innerHTML == 'x') {
            displayController.resultDisplayer('Player One Wins!');
            gameLogic.endGame();
        } 
        else if (s[0].innerHTML == 'o' && s[1].innerHTML == 'o' && s[2].innerHTML == 'o'
        || s[3].innerHTML == 'o' && s[4].innerHTML == 'o' && s[5].innerHTML == 'o'
        || s[6].innerHTML == 'o' && s[7].innerHTML == 'o' && s[8].innerHTML == 'o'
        || s[0].innerHTML == 'o' && s[3].innerHTML == 'o' && s[6].innerHTML == 'o'
        || s[1].innerHTML == 'o' && s[4].innerHTML == 'o' && s[7].innerHTML == 'o'
        || s[2].innerHTML == 'o' && s[5].innerHTML == 'o' && s[8].innerHTML == 'o'
        || s[0].innerHTML == 'o' && s[4].innerHTML == 'o' && s[8].innerHTML == 'o'
        || s[2].innerHTML == 'o' && s[4].innerHTML == 'o' && s[6].innerHTML == 'o') {
            displayController.resultDisplayer('Player Two Wins!');
            gameLogic.endGame();
        } else {
            for (let i = 0; i < 9; i++) {
                if (i != 8 && s[i].innerHTML != '') {
                    continue;
                } else if (s[i].innerHTML == '') {
                    break;
                } else if (i == 8 && s[i].innerHTML != '') {
                    displayController.resultDisplayer('Its a Draw!');
                    gameLogic.endGame();
                }
            }
        }
    }

    const endGame = () => {
        const squares = document.getElementsByClassName('square');
        for (let i = 0; i < 9; i++) {
            let newSquare = squares[i].cloneNode(true);
            squares[i].parentNode.replaceChild(newSquare, squares[i]);
        }
    }
    
    return {gameWinner, endGame};
})();

displayController.playerOnePiece();
gameBoard.createSquares();
