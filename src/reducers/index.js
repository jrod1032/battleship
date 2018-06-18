import { combineReducers } from 'redux';
import * as actions from '../actions/index.js';
import * as helpers from '../lib/index.js';
import { gamePieces } from '../gameConstants.js';

const initialState = {
  selectedPiece: null,
  selectedPosition: null,
  playerBoard: helpers.createBoard(),
  enemyBoard: helpers.createBoardWithRandomPieces(),
  enemyFleet: [
    ['ACC', 0, gamePieces['ACC']], 
    ['BS', 0, gamePieces['BS']],
    ['C', 0, gamePieces['C']],
    ['D', 0, gamePieces['D']],
    ['S', 0, gamePieces['S']],
  ],
  playerFleet: [
    ['ACC', 0, gamePieces['ACC']], 
    ['BS', 0, gamePieces['BS']],
    ['C', 0, gamePieces['C']],
    ['D', 0, gamePieces['D']],
    ['S', 0, gamePieces['S']],
  ],
  playerName: actions.PLAYER_NAME,
  enemyName: actions.ENEMY_NAME,
  turn: actions.PLAYER_NAME,
  alreadySelectedShips: []
}

function gameLogic (state = initialState, action) {
  switch (action.type) {
    case actions.ADD_SHIP:
      return Object.assign({}, state, {
          playerBoard: helpers.getNewBoard(state.playerBoard, action)
      })
    case actions.ADD_SHIP_TO_ALREADY_CHOSEN_LIST:
      return Object.assign({}, state, {
        alreadySelectedShips: [...state.alreadySelectedShips, action.selectedShip]
      })  
    case actions.SELECT_SHIP:
      return Object.assign({}, state, {
        selectedPiece: action.piece
      })    
    case actions.SELECT_POSITION: 
      return Object.assign({}, state, {
        selectedPosition: action.position
      })  
    case actions.DESTROY_SPOT:
      return Object.assign({}, state, {
        [action.board]: state[action.board].map((row, rowIdx) => {
          return row.map((spot, colIdx) => {
            if (rowIdx === action.row && colIdx === action.col) {
              return Object.assign({}, spot, {hit: true})
            }
            return spot;
          })
        }),
        [action.fleet]: state[action.fleet].map( shipHitCount => {
          let spotName = state[action.board][action.row][action.col].piece;
          if (spotName === shipHitCount[0])  {
            shipHitCount[1]++;
            return shipHitCount
          }   
          return shipHitCount;
        })
      }) 
    case actions.DESTROY_SHIP:
      return Object.assign({}, state, {
        [action.board]: state[action.board].map( (row, rowIdx) => {
          return row.map( (spot, colIdx) => {
            if (spot.piece === action.ship.piece) {
              return Object.assign({}, spot, {show: true})
            }
            return spot;
          })
        })
      })  
    case actions.CHANGE_TURN:
      return Object.assign({}, state, {
        turn: action.turn
      }) 
    default: return state  
  }
}

const initialComputerMoveLogic = {
  mode: 'hunt',
  firstSpotHit: null,
  lastSpotHit: null,
  targetDirection: 'above',
  didComputerHitLastTurn: false,
  targetShipHitCount: 0
}

function computerMoveLogic(state = initialComputerMoveLogic, action) {
  switch (action.type) {
    case actions.CHANGE_COMPUTER_MODE:
      return Object.assign({}, state, {
        mode: action.mode,
      })
    case actions.CHANGE_TARGET_DIRECTION:
      return Object.assign({}, state, {
        targetDirection: action.targetDirection
      })
    case actions.CHANGE_FIRST_SPOT_HIT:
      return Object.assign({}, state, {
        firstSpotHit: [action.row, action.col],
        lastSpotHit: [action.row, action.col]
      })  
    case actions.CHANGE_LAST_SPOT_HIT:
      return Object.assign({}, state, {
        lastSpotHit: [action.row, action.col],
        didComputerHitLastTurn: true
      })  
    case actions.CHANGE_HIT_LAST_TURN:
      return Object.assign({}, state, {
        didComputerHitLastTurn: action.hit
      })  
    case actions.CHANGE_TARGET_SHIP_HIT_COUNT:
      return Object.assign({}, state, {
        targetShipHitCount: action.hits
      })  
    default: return state;    
  }
}

function gamePhase (state = 'pregamePhase', action) {
  switch(action.type) {
    case actions.CHANGE_GAME_PHASE:
      return action.phase;
    default: return state;  
  }
}

function shipsOnBoard(state = {playerShipCount: 0}, action) {
  switch(action.type) {
    case actions.INCREMENT_SHIP_COUNT:
      let newCount = state.playerShipCount;
      newCount++
      return Object.assign({}, state, {
        playerShipCount: newCount
      })
    default: return state;  
  }
}

function hitCounts(state={playerBoardHitCount: 0, enemyBoardHitCount: 0}, action) {
  switch(action.type) {
    case actions.INCREMENT_HIT_COUNT:
    const boardHitType = action.boardType === 'playerBoard' ? 'playerBoardHitCount' : 'enemyBoardHitCount';
    let newCount = state[boardHitType];
    newCount++;
      return Object.assign({}, state, {
        [boardHitType]: newCount
      })
    default: return state  
  }
}

const BattleshipApp = combineReducers({
  gameLogic,
  gamePhase,
  shipsOnBoard,
  hitCounts,
  computerMoveLogic
});


export default BattleshipApp;