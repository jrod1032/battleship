import * as types from '../../gameConstants.js';
import reducer from '../../reducers'
import * as helpers from '../../lib/index.js';
import { createStore } from 'redux';

let store = createStore(reducer);

describe('gameLogic', () => {
  it('should handle ADD_SHIP', () => {
    const addShipActionVertical = {
      type: types.ADD_SHIP,
      piece: 'S',
      pos: 'vertical',
      row: 1,
      col: 1
    }
    const addShipHorizontal = {
      type: types.ADD_SHIP,
      piece: 'S',
      pos: 'horizontal',
      row: 1,
      col: 1     
    }

    expect(reducer({}, addShipActionVertical).gameLogic.playerBoard[1][1].piece).toEqual('S');
    expect(reducer({}, addShipActionVertical).gameLogic.playerBoard[2][1].piece).toEqual('S');
    expect(reducer({}, addShipActionVertical).gameLogic.playerBoard[3][1].piece).toEqual('E');
    expect(reducer({}, addShipActionVertical).gameLogic.playerBoard[1][1].show).toEqual(false);
    expect(reducer({}, addShipActionVertical).gameLogic.playerBoard[1][1].hit).toEqual(false);
    expect(reducer({}, addShipActionVertical).gameLogic.playerBoard[1][1].pos).toEqual('vertical');

    expect(reducer({}, addShipHorizontal).gameLogic.playerBoard[1][1].piece).toEqual('S');
    expect(reducer({}, addShipHorizontal).gameLogic.playerBoard[1][2].piece).toEqual('S');
    expect(reducer({}, addShipHorizontal).gameLogic.playerBoard[1][3].piece).toEqual('E');
    expect(reducer({}, addShipHorizontal).gameLogic.playerBoard[1][1].pos).toEqual('horizontal');
  })

  it('should handle ADD_SHIP_TO_ALREADY_CHOSEN_LIST', () => {
    const addShipToAlreadyChosenListAction = {
      type: types.ADD_SHIP_TO_ALREADY_CHOSEN_LIST,
      selectedShip: 'ACC'
    }
    expect(reducer({}, addShipToAlreadyChosenListAction).gameLogic.alreadySelectedShips).toEqual(['ACC'])
  })

  it('should handle SELECT_SHIP', () => {
    const selectShipAction = {
      type: types.SELECT_SHIP,
      piece: 'ACC'
    }
    expect(reducer({}, selectShipAction).gameLogic.selectedPiece).toEqual('ACC');
    expect(reducer({}, {type: null}).gameLogic.selectedPiece).toEqual(null);
  })

  it('should handle SELECT_POSITION', () => {
    const selectPositionAction = {
      type: types.SELECT_POSITION,
      position: 'vertical'
    }
    expect(reducer({}, selectPositionAction).gameLogic.selectedPosition).toEqual('vertical');
    expect(reducer({}, {type: null}).gameLogic.selectedPosition).toEqual(null);

  })  
  it('should handle DESTROY_SPOT', () => {
    const destroySpotOnPlayerBoardAction = {
      type: types.DESTROY_SPOT,
      row: 1,
      col: 1,
      board: 'playerBoard',
      fleet: 'playerFleet'
    }
    const destroySpotOnEnemyBoardAction = {
      type: types.DESTROY_SPOT,
      row: 1,
      col: 1,
      board: 'enemyBoard',
      fleet: 'enemyFleet'
    }    
    store.getState().gameLogic.playerBoard[1][1] = {piece:'BS', hit: false, show: false, pos: 'vertical'}
    store.getState().gameLogic.enemyBoard[1][1] = {piece:'BS', hit: false, show: false, pos: 'vertical'}    
    expect(reducer({}, destroySpotOnPlayerBoardAction).gameLogic.playerFleet[1]).toEqual(['BS', 1, 4])
    expect(reducer({}, destroySpotOnPlayerBoardAction).gameLogic.playerBoard[1][1].hit).toEqual(true)
    expect(reducer({}, destroySpotOnEnemyBoardAction).gameLogic.enemyFleet[1]).toEqual(['BS', 1, 4])
    expect(reducer({}, destroySpotOnEnemyBoardAction).gameLogic.enemyBoard[1][1].hit).toEqual(true)    
    store.getState().gameLogic.playerBoard[1][1] = 'E'
    store.getState().gameLogic.enemyBoard[1][1] = 'E'
  })

  it('should handle DESTROY_SHIP', () => {
    const destroyShipOnPlayerBoardAction = {
      type: types.DESTROY_SHIP,
      ship: {piece:'BS', show: false, hit: false, pos: 'vertical'},
      board: 'playerBoard'
    }
    const destroyShipOnEnemyBoardAction = {
      type: types.DESTROY_SHIP,
      ship: {piece:'BS', show: false, hit: false, pos: 'vertical'},
      board: 'enemyBoard'
    }
    store.getState().gameLogic.playerBoard[1][1] = {piece:'BS', hit: false, show: false, pos: 'vertical'}
    store.getState().gameLogic.enemyBoard[1][1] = {piece:'BS', hit: false, show: false, pos: 'vertical'}
    expect(reducer({},destroyShipOnPlayerBoardAction).gameLogic.playerBoard[1][1].show).toEqual(true);
    expect(reducer({},destroyShipOnEnemyBoardAction).gameLogic.enemyBoard[1][1].show).toEqual(true);
  })
  it('should handle CHANGE_TURN', () => {
    const changeTurnAction = {
      type: types.CHANGE_TURN,
      turn: 'Test'
    }
    expect(reducer({}, changeTurnAction).gameLogic.turn).toEqual('Test')
    expect(reducer({}, {type: null}).gameLogic.turn).toEqual(types.PLAYER_NAME)
  })
})
describe('ComputerMoveLogic', () => {

  it('should handle CHANGE_COMPUTER_MODE', () => {
    const changeComputerModeAction = {
      type: types.CHANGE_COMPUTER_MODE,
      mode: 'target'
    }
    // store.dispatch(changeComputerModeAction);
    expect(reducer({}, changeComputerModeAction).computerMoveLogic.mode).toEqual('target')
  })
  it('should handle CHANGE_TARGET_DIRECTION', () => {
    const changeTargetDirectionAction = {
      type: types.CHANGE_TARGET_DIRECTION,
      targetDirection: 'left'
    }
    expect(reducer({}, changeTargetDirectionAction).computerMoveLogic.targetDirection).toEqual('left')
  })
  it('should handle CHANGE_FIRST_SPOT_HIT', () => {
    const changeFirstSpotHitAction = {
      type: types.CHANGE_FIRST_SPOT_HIT,
      row: 5,
      col: 7
    }
    expect(reducer({}, changeFirstSpotHitAction).computerMoveLogic.firstSpotHit).toEqual([5, 7])
  })
  it('should handle CHANGE_LAST_SPOT_HIT', () => {
    const changeLastSpotHitAction = {
      type: types.CHANGE_LAST_SPOT_HIT,
      row: 6,
      col: 8
    }
    expect(reducer({},changeLastSpotHitAction).computerMoveLogic.lastSpotHit).toEqual([6, 8])
  })
  it('should handle CHANGE_HIT_LAST_TURN', () => {
    const changeHitLastTurnAction = {
      type: types.CHANGE_HIT_LAST_TURN,
      hit: true
    }
    expect(reducer({}, changeHitLastTurnAction).computerMoveLogic.didComputerHitLastTurn).toEqual(true)
  })
  it('should handle CHANGE_TARGET_SHIP_HIT_COUNT', () => {
    const changeTargetShipHitCountAction = {
      type: types.CHANGE_TARGET_SHIP_HIT_COUNT,
      hits: 3
    }
    expect(reducer({}, changeTargetShipHitCountAction).computerMoveLogic.targetShipHitCount).toEqual(3)
  })
})

describe('gamePhase', () => {
  it('should handle CHANGE_GAME_PHASE', () => {
    const changeGamePhaseAction = {
      type: types.CHANGE_GAME_PHASE,
      phase: 'battlePhase'
    }
    expect(reducer(undefined, changeGamePhaseAction).gamePhase).toEqual('battlePhase')
  })
  it('should handle default case', () => {
    expect(reducer(undefined, {type: null}).gamePhase).toEqual('pregamePhase')
  })
})

describe('shipsOnBoard', () => {
  it('should handle INCREMENT_SHIP_COUNT', () => {
    const incrementShipCountAction = {
      type: types.INCREMENT_SHIP_COUNT,
    }
    expect(reducer({}, incrementShipCountAction).shipsOnBoard).toEqual({playerShipCount: 1})
  })
  it('should handle default case', () => {
    expect(reducer(undefined, {type: null}).shipsOnBoard).toEqual({playerShipCount: 0})
  })
})

describe('hitCounts', () => {
  it('should handle INCREMENT_HIT_COUNT', () => {
    const incrementHitCountOfPlayerAction = {
      type: types.INCREMENT_HIT_COUNT,
      boardType: 'playerBoard'
    }
    const incrementHitCountOfEnemyAction = {
      type: types.INCREMENT_HIT_COUNT,
      boardType: 'enemyBoard'
    }    
    expect(reducer({}, incrementHitCountOfPlayerAction).hitCounts).toEqual({playerBoardHitCount: 1, enemyBoardHitCount: 0})
    expect(reducer({}, incrementHitCountOfEnemyAction).hitCounts).toEqual({playerBoardHitCount: 0, enemyBoardHitCount: 1})
  })
})