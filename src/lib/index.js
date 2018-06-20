import { gamePieces } from '../gameConstants.js'

export const createBoard = (board) => {
  const newBoard = [];
  for (let m = 0; m < 10; m++) {
    let row = [];
    for (let n = 0; n < 10; n++) {
      let piece = board ? board[m][n] : {piece: 'E', pos: null, hit: false, show: false};
      row.push(piece);
    }
    newBoard.push(row);
  }
  return newBoard;
}

export const getNewBoard = (board, action) => {
  const newBoard = createBoard(board);
  const newPiece = {piece: action.piece, pos: action.pos, hit: false, show: false}
  if (action.pos === 'horizontal') {
    for (let n = 0; n < gamePieces[action.piece]; n++) {
      newBoard[action.row][n + action.col] = newPiece;
    }
  } else {
    for (let m = 0; m < gamePieces[action.piece]; m++) {
      newBoard[m + action.row][action.col] = newPiece;
    }
  }
  return newBoard;
}

export const createBoardWithRandomPieces = () => {
  const newBoard = createBoard();
  const ships = ['ACC', 'BS', 'C', 'S', 'D'];
  for (let i = 0; i < ships.length; i++) {
    let shipName = ships[i];
    let position = getRandomPosition();
    let { row, column } = getValidPosition(shipName, position, newBoard);
    let newPiece = {piece: shipName, pos: position, hit: false, show: false}
    for (let j = 0; j < gamePieces[shipName]; j++) {
      if (position === 'horizontal') {
        newBoard[row][column + j] = newPiece;
      } else {
        newBoard[row + j][column] = newPiece;
      }
    }
  }
  return newBoard;
}

export const getValidPosition = function(shipName, position, board) {
  let boardLength = 10;
  let row;
  let column
  let isSpaceOccupied = true;
  while (isSpaceOccupied) {
    if (position === 'horizontal') {
      let horizontalRange = boardLength - gamePieces[shipName];
      row = getRandomNumber(0, boardLength - 1);
      column = getRandomNumber(0, horizontalRange);
      isSpaceOccupied = checkIfRangeIsOccupied(row, column, gamePieces[shipName], position, board)
    } else {
      let verticalRange = boardLength - gamePieces[shipName];
      row = getRandomNumber(0, verticalRange);
      column = getRandomNumber(0, boardLength - 1);
      isSpaceOccupied = checkIfRangeIsOccupied(row, column, gamePieces[shipName], position, board)
    }
  }

  return { row, column };
}

export const checkIfRangeIsValid = function(row, column, spaces, position, board) {
  for (let i = 0; i < spaces; i++) {
    //check if valid spot for function reuse. Computer generated row and position 
    //will be valid
    if (position === 'horizontal' && !board[row][column + i]) {
      return false;
    } else if (position === 'vertical' && !board[row + i]) {
      return false;
    }
  }
  return true;
}

export const checkIfRangeIsOccupied = function(row, column, spaces, position, board) {
  for (let i = 0; i < spaces; i++) {
    if (position === 'horizontal' && board[row][column + i].piece !== 'E') {
      return true;
    } else if (position === 'vertical' && board[row + i][column].piece !== 'E') {
      return true;
    }
  }
  return false;
}

export const decideWhichSpotToHit = (board, mode, firstSpotHit, lastSpotHit, direction, didComputerHitLastTurn) => {

  const directions = ['above', 'right', 'below', 'left'];

  let currentTargetDirection = direction;

  if (mode === 'hunt') {
    const { row, col } = destroyRandomSpotOnPlayerBoard(board);
    return { row, col};
  } else {
    //target mode
      let initialRow;
      let initialColumn;
      let row;
      let col;

      if (!didComputerHitLastTurn) {
        initialRow = firstSpotHit[0];
        initialColumn = firstSpotHit[1];
      } else {
        initialRow = lastSpotHit[0];
        initialColumn = lastSpotHit[1];
      }

      let nextSpotIsInvalid = true;
      let loopCount = 0;
      do {
        let {newRow, newCol} = mapDirectionToNextSpot(currentTargetDirection, initialRow, initialColumn);
        row = newRow;
        col = newCol;

        if (board[row] && board[row][col] && !board[row][col].hit) {
          nextSpotIsInvalid = false;
        } else {
          currentTargetDirection = getNextTargetDirection(currentTargetDirection);
          loopCount++;
          if (loopCount > 4) {
            initialRow = firstSpotHit[0];
            initialColumn = firstSpotHit[1];
          }
        }
      } while (nextSpotIsInvalid)

      return { row, col, currentTargetDirection };
  }

}

export const getNextTargetDirection  = (targetDirection) => {
  const directions = {
    above: 'right',
    right: 'below',
    below: 'left',
    left: 'above'
  }
  return directions[targetDirection];
} 

export const getOppositeTargetDirection = (targetDirection) => {
  const directions = {
    above: 'below',
    left: 'right',
    below: 'above',
    right: 'left'
  }

  return directions[targetDirection];
}

export const mapDirectionToNextSpot = (direction, row, col) => {
  let newRow = row;
  let newCol = col;

  if (direction === 'above') {
    newRow = row - 1;
    newCol = col    
  } else if (direction === 'right') {
    newRow = row;
    newCol = col + 1;
  } else if (direction ==='below') {
    newRow = row + 1
    newCol = col
  } else if (direction === 'left') {
    newRow = row;
    newCol = col - 1
  } 
  return { newRow, newCol }
}

export const destroyRandomSpotOnPlayerBoard = function(board) {
  let isSpaceOccupied = true;
  let row;
  let col;
  while(isSpaceOccupied) {
    row = getRandomNumber(0, 9);
    col = getRandomNumber(0,9);
    if (!board[row][col].hit) {
      isSpaceOccupied = false;
    }
  }
  return { row, col }
}

export const isShipDestroyed = (spot, fleets) => {
  const shipName = spot.piece;
  for (let i = 0; i < fleets.length; i++) {
    if (fleets[i][0] === shipName) {
      return fleets[i][1] === fleets[i][2];
    }
  }
  return;
}

export const getRandomNumber = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

export const getRandomPosition = function() {
  return Math.random() > .5 ? 'horizontal' : 'vertical'
}
