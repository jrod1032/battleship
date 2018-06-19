import { batchActions } from 'redux-batched-actions';
import * as helpers from '../lib/index.js';
import { gamePieces, targetDirectionList } from '../gameConstants.js';
import hit_ship from '../sounds/hit_ship.mp3';
import splash from '../sounds/splash.mp3';
import destroy_ship from '../sounds/destroy_ship.mp3';
import add_piece from '../sounds/add_piece.mp3';
import * as types from '../gameConstants.js';
//Sounds

const hitShipSound = new Audio(hit_ship)
const splashSound = new Audio(splash)
const destroyShipSound = new Audio(destroy_ship)
const addPieceSound = new Audio(add_piece)

//Thunks

export const pregameBoardClick = (row, col) => {
  return (dispatch, getState) => {
    const state = getState();
    const { selectedPiece, selectedPosition, playerBoard, enemyBoard, alreadySelectedShips, enemyFleet } = state.gameLogic;
    const { playerShipCount } = state.shipsOnBoard;

    if (!selectedPiece || !selectedPosition) {
      alert('Please select a ship and position');
      return;
    } else if (alreadySelectedShips.indexOf(selectedPiece) > -1) {
      alert(`You have already chosen the ${selectedPiece}. Please choose another`)
      return;
    } else if (!helpers.checkIfRangeIsValid(row, col, gamePieces[selectedPiece], selectedPosition, playerBoard)) {
      alert('Invalid spot!');
      return;
    }
    addPieceSound.play();
    dispatch(batchActions([
      incrementShipCount(),
      addShip(selectedPiece, selectedPosition, row, col),
      addShipToAlreadyChosenList(selectedPiece)
      ]))

    if (playerShipCount === 4) {
      dispatch(changeGamePhase('battlePhase'))
      alert('Start Battle!');
    }
  }
}

export const battlePhaseBoardClick = (row, col) => {
  return (dispatch, getState) => {
    const state = getState();
    const { enemyBoard, enemyFleet, turn } = state.gameLogic
    const { enemyBoardHitCount }  = state.hitCounts;

    if (turn !== 'Player') {
      alert('Wait your turn!');
      return;
    }

    dispatch(destroyEnemySpot(row, col, 'enemyBoard', 'enemyFleet'))

    if (enemyBoard[row][col].piece !== 'E') {
      dispatch(onSpotIsHit(enemyBoard[row][col], enemyFleet, enemyBoardHitCount))
      dispatch(changeTurn(types.ENEMY_NAME))
      setTimeout(()=> dispatch(enemyTurn()), 5000);
    } else {
      splashSound.play();
      dispatch(changeTurn(types.ENEMY_NAME))
      setTimeout(()=> dispatch(enemyTurn()), 3000);         
    }
  }
}

export const battlePhaseOwnBoardClick = () => {
  return (dispatch, getState) => {
    alert(`Don't destroy your own ships!`);
  }
}

export const pregameEnemyBoardClick = () => {
  return (dispatch, getState) => {
    alert('Not ready to destroy!');
  }
}

const enemyTurn = () => {
  return (dispatch, getState) => {
    const state = getState();

    if (state.gamePhase === 'endGame') {return ;}

    const { playerBoard, playerFleet } = state.gameLogic;
    const { playerBoardHitCount } = state.hitCounts;
    const { mode, targetDirection, firstSpotHit, lastSpotHit, didComputerHitLastTurn, targetShipHitCount } = state.computerMoveLogic;
    
    const { row, col, currentTargetDirection } = helpers.decideWhichSpotToHit(playerBoard, mode, firstSpotHit, lastSpotHit, targetDirection, didComputerHitLastTurn)
    dispatch(destroyEnemySpot(row, col, 'playerBoard', 'playerFleet'))
    if (playerBoard[row][col].piece !== 'E') {
      //enemy hits ship on player board
      if (mode === 'target') {
        dispatch(batchActions([
          changeTargetShipHitCount(targetShipHitCount + 1),
          changeLastSpotHit(row, col),
          changeTargetDirection(currentTargetDirection),
          changeTurn(types.PLAYER_NAME)
          ]))
        dispatch(onPlayerSpotIsHit(playerBoard[row][col], playerFleet, playerBoardHitCount))
      } else {
        dispatch(batchActions([
          changeComputerMode('target'),
          changeTargetShipHitCount(targetShipHitCount + 1),
          changeFirstSpotHit(row, col),
          changeTurn(types.PLAYER_NAME)
          ]))
          dispatch(onPlayerSpotIsHit(playerBoard[row][col], playerFleet, playerBoardHitCount))
      }
    } else {
      splashSound.play();
      if (mode === 'target') {
        if (targetShipHitCount > 1) {
          console.log('Going oppo');
          dispatch(batchActions([
            changeTargetDirection(helpers.getOppositeTargetDirection(targetDirection)),
            changeHitLastTurn(false)
            ]))
        } else {
          dispatch(batchActions([
            changeTargetDirection(helpers.getNextTargetDirection(targetDirection)),
            changeHitLastTurn(false)
            ]))
        }
      }
      dispatch(changeTurn(types.PLAYER_NAME));
    }
  }
}

const onSpotIsHit = (spot, fleet, boardHitCount) => {
  return (dispatch, getState) => {
    if (helpers.isShipDestroyed(spot, fleet)) {
      destroyShipSound.play();
      dispatch(batchActions([
        destroyShip(spot, 'enemyBoard'),
        incrementHitCount('enemyBoard')
        ]))
      // count is 4 because hit count has not dispatched yet
      if (boardHitCount === 4) {
        dispatch(changeGamePhase('endGame'));
      } 

    } else {
      hitShipSound.play();
    }
  }
}

const onPlayerSpotIsHit = (spot, fleet, boardHitCount) => {
  return (dispatch, getState) => {
    if (helpers.isShipDestroyed(spot, fleet)) {
      destroyShipSound.play();
      dispatch(batchActions([
        destroyShip(spot, 'playerBoard'),
        incrementHitCount('playerBoard'),
        changeComputerMode('hunt'),
        changeTargetShipHitCount(0)
        ]))
      if (boardHitCount === 4) {
        dispatch(changeGamePhase('endGame'));
      }
    } else {
      hitShipSound.play();
      dispatch(changeHitLastTurn(true));
    }
  }
}

//Action creators
export const changeTargetShipHitCount = (hits) => {
return {
    type: types.CHANGE_TARGET_SHIP_HIT_COUNT,
    hits
  }
}

export const addShip = (selectedShip, selectedPosition, row, col) => {
  if (!selectedShip || !selectedPosition) return;
  return {
    type: types.ADD_SHIP,
    piece: selectedShip,
    pos: selectedPosition,
    row,
    col
  }
}

export const addShipToAlreadyChosenList = (selectedShip) => {
  return {
    type: types.ADD_SHIP_TO_ALREADY_CHOSEN_LIST,
    selectedShip
  }
}

export const selectShip = (piece, position="vertical") => {
  if (!piece) return;
  return {
    type: types.SELECT_SHIP,
    piece,
    position
  }
}

export const selectPosition = (position) => {
  if (!position) return;
  return {
    type: types.SELECT_POSITION,
    position
  }
}

export const incrementShipCount = () => {
  return {
    type: types.INCREMENT_SHIP_COUNT
  }
}

export const incrementHitCount = (boardType) => {
  return {
    type: types.INCREMENT_HIT_COUNT,
    boardType
  }
}

export const changeTurn = (turn) => {
  return {
    type: types.CHANGE_TURN,
    turn
  }
}
export const changeGamePhase = (phase) => {
  return {
    type: types.CHANGE_GAME_PHASE,
    phase
  }
}

export const changeComputerMode = (mode) => {
  return {
    type: types.CHANGE_COMPUTER_MODE,
    mode
  }
}

export const changeTargetDirection = (targetDirection) => {
  return {
    type: types.CHANGE_TARGET_DIRECTION,
    targetDirection
  }
}

export const changeFirstSpotHit = (row, col) => {
  return {
    type: types.CHANGE_FIRST_SPOT_HIT,
    row,
    col
  }
}
export const changeLastSpotHit = (row, col) => {
  return {
    type: types.CHANGE_LAST_SPOT_HIT,
    row, 
    col
  }
}

export const changeHitLastTurn = (hit) => {
  return {
    type: types.CHANGE_HIT_LAST_TURN,
    hit
  }
}


export const destroyEnemySpot = (row, col, board, fleet) => {
  return {
    type: types.DESTROY_SPOT,
    row,
    col,
    board,
    fleet
  }
}

export const destroyShip = (ship, board) => {
  return {
    type: types.DESTROY_SHIP,
    ship: ship,
    board: board
  }
}
