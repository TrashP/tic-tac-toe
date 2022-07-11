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
                // add functions to switch display after each turn
                square.innerHTML = displayController.changePiece();
                displayController.changeMarkers();
                displayController.changePlayers();

                // function to decide result and display winner
                gameLogic.gameWinner();

                // disable squares after it is clicked
                this.removeEventListener('click', arguments.callee);

                // remove event listener from markers
                for (let i = 0; i < 9; i++) {
                    const squares = document.getElementsByClassName('square');
                    if (displayController.markerEvent && squares[i] != '') {
                        displayController.markerEvent = false;
                        const markers = document.getElementsByClassName('markers');
                        let newMarkerX = markers[0].cloneNode(true);
                        let newMarkerO = markers[1].cloneNode(true);
                        markers[0].parentNode.replaceChild(newMarkerX, markers[0]);
                        markers[1].parentNode.replaceChild(newMarkerO, markers[1]);
                    }
                }
            })
        }
    }    

    return {createSquares};
})();

const displayController = (() => {
    let playerPiece = 'x';
    let markerEvent = true;

    const playerOnePiece = () => {
        // allow player one to choose marker
        markerEvent = true;
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
        
        // blur the board and display result on top
        let resultDisplay = document.createElement('div');
        resultDisplay.setAttribute('class', 'displayResult');
        con[0].appendChild(resultDisplay);
        resultDisplay.innerHTML = `${text}`;
        board[0].setAttribute('class', 'gameBoard playerWins');
        control[0].setAttribute('class', 'controllers playerWins');
    }

    return {markerEvent, playerOnePiece, changePiece, changeMarkers, changePlayers, resultDisplayer}; 
})();

const gameLogic = (() => {

    const gameWinner = () => {
        const s = document.getElementsByClassName('square');

        // winning conditions for players
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
            // conditions for draw
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

    const restartGame = () => {
        const removeDisplay = document.getElementsByClassName('displayResult');
        if (removeDisplay.length > 0) {
            removeDisplay[0].remove();
        }
        let board = document.getElementsByClassName('gameBoard');
        let control = document.getElementsByClassName('controllers')

        board[0].setAttribute('class', 'gameBoard');
        control[0].setAttribute('class', 'controllers');

        // switch all display to initial conditions
        const markers = document.getElementsByClassName('markers');
        displayController.playerOnePiece();
        markers[1].setAttribute('class', 'markers');
        const playerOne = document.getElementById('one');
        const playerTwo = document.getElementById('two');
        playerTwo.setAttribute('class', '');
        playerOne.setAttribute('class', 'selected');

        const squares = document.getElementsByClassName('square');
        for (let i = 0; i < 9; i++) {
            // replace the grid and restart game
            let newSquare = squares[i].cloneNode(true);
            squares[i].parentNode.replaceChild(newSquare, squares[i]);
            newSquare.innerHTML = '';
            newSquare.addEventListener('click', function() {
                newSquare.innerHTML = displayController.changePiece();
                displayController.changeMarkers();
                displayController.changePlayers();
                gameLogic.gameWinner();

                // remove event listener from markers
                for (let i = 0; i < 9; i++) {
                    const squares = document.getElementsByClassName('square');
                    if (displayController.markerEvent && squares[i] != '') {
                        displayController.markerEvent = false;
                        const markers = document.getElementsByClassName('markers');
                        let newMarkerX = markers[0].cloneNode(true);
                        let newMarkerO = markers[1].cloneNode(true);
                        markers[0].parentNode.replaceChild(newMarkerX, markers[0]);
                        markers[1].parentNode.replaceChild(newMarkerO, markers[1]);
                    }
                }

                this.removeEventListener('click', arguments.callee);
            })
        }
    }
    
    return {gameWinner, endGame, restartGame};
})();

displayController.playerOnePiece();
gameBoard.createSquares();
const restart = document.getElementsByClassName('restart');
restart[0].addEventListener('click', gameLogic.restartGame);
