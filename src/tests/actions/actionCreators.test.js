import * as actions from '../../actions/index.js';
import * as types  from '../../gameConstants.js';

describe('actions', () => {

  it ('should create an action to select a ship, even if no position is provided', () => {
    const piece = 'ACC';
    const position = 'vertical'
    const expectedAction = {
      type: types.SELECT_SHIP,
      piece, 
      position
    }
    expect(actions.selectShip(piece, position)).toEqual(expectedAction);
    expect(actions.selectShip(piece)).toEqual(expectedAction);
  })

  it('should create an action to select position of ship', () => {
    const position = 'horizontal'
    const expectedAction = {
      type: types.SELECT_POSITION,
      position
    }

    expect(actions.selectPosition(position)).toEqual(expectedAction)
  })

  it('should create an action to add ship', () => {
    const selectedShip = 'ACC';
    const selectedPosition = 'horizonal';
    const row = 1;
    const col = 1;
    const expectedAction = {
      type: types.ADD_SHIP,
      piece: selectedShip,
      pos: selectedPosition,
      row,
      col
    }
    expect(actions.addShip(selectedShip, selectedPosition, row, col)).toEqual(expectedAction);
  })

  it('should create an action to add ship to already chosen list', () => {
    const selectedShip = 'ACC';
    const expectedAction = {
      type: types.ADD_SHIP_TO_ALREADY_CHOSEN_LIST,
      selectedShip
    }
    expect(actions.addShipToAlreadyChosenList(selectedShip)).toEqual(expectedAction);
  })

  it('should create an action to change game phase', () => {
    const phase = 'battlePhase';
    const expectedAction = {
      type: types.CHANGE_GAME_PHASE,
      phase
    }
    expect(actions.changeGamePhase(phase)).toEqual(expectedAction);
  })

  it('should create an action to destroy spot', () => {
    const row = 1;
    const col = 1;
    const board = 'playerBoard';
    const fleet = 'playerFleet';
    const expectedAction = {
      type: types.DESTROY_SPOT,
      row, 
      col,
      board, 
      fleet
    }
    expect(actions.destroyEnemySpot(row, col, board, fleet)).toEqual(expectedAction);
  })

  it('should create an action to destroy a ship', () => {
    const spot = {hit: false, show: false, pos: 'horizontal', piece: 'ACC'};
    const boardType = 'playerBoard';
    const expectedAction = {
      type: types.DESTROY_SHIP,
      ship: spot,
      board: boardType
    }
    expect(actions.destroyShip(spot, boardType)).toEqual(expectedAction);
  })

  it('should create actions to change first spot and last spot hit', () => {
    const row = 1;
    const col = 1;
    const expectedActionFirstSpot = {
      type: types.CHANGE_FIRST_SPOT_HIT,
      row,
      col
    }
    const expectedActionLastSpot = {
      type: types.CHANGE_LAST_SPOT_HIT,
      row,
      col
    } 
    expect(actions.changeFirstSpotHit(row, col)).toEqual(expectedActionFirstSpot);
    expect(actions.changeLastSpotHit(row, col)).toEqual(expectedActionLastSpot);   
  })

  it('should create an action to change if computer hit last turn', () => {
    const hit = true
    const expectedAction = {
      type: types.CHANGE_HIT_LAST_TURN,
      hit
    }
    expect(actions.changeHitLastTurn(hit)).toEqual(expectedAction);
  })
})

it('should change target ship hit counts for computer', () => {
  const hits = 2;

  const expectedAction = {
    type: types.CHANGE_TARGET_SHIP_HIT_COUNT,
    hits
  }
  expect(actions.changeTargetShipHitCount(hits)).toEqual(expectedAction);
})