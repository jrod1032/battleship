import * as helpers from '../../lib/index.js';
import { playerBoard, enemyBoard } from '../data/testBoards.js';

describe('Map Directions To Next Spot', () => {
  it('returns correct row and column given above direction', () => {
    const {newRow, newCol} = helpers.mapDirectionToNextSpot('above', 2, 2);
    expect(newRow).toEqual(1);
    expect(newCol).toEqual(2);
  })
  it('returns correct row and column given right direction', () => {
    const {newRow, newCol} = helpers.mapDirectionToNextSpot('right', 2, 2);
    expect(newRow).toEqual(2);
    expect(newCol).toEqual(3);
  })
  it('returns correct row and column given left direction', () => {
    const {newRow, newCol} = helpers.mapDirectionToNextSpot('left', 2, 2);
    expect(newRow).toEqual(2);
    expect(newCol).toEqual(1);
  })
  it('returns correct row and column given below direction', () => {
    const {newRow, newCol} = helpers.mapDirectionToNextSpot('below', 2, 2);
    expect(newRow).toEqual(3);
    expect(newCol).toEqual(2);
  })  
  it('returns same row and column given no direction', () => {
    const {newRow, newCol} = helpers.mapDirectionToNextSpot(null, 2, 2);
    expect(newRow).toEqual(2);
    expect(newCol).toEqual(2);
  })       
})

describe('Get Next Target Direction', () => {
  it('return next direction given a direction', () => {
    const nextDirectionFromAbove = helpers.getNextTargetDirection('above');
    const nextDirectionFromRight = helpers.getNextTargetDirection('right');
    const nextDirectionFromBelow = helpers.getNextTargetDirection('below');
    const nextDirectionFromLeft = helpers.getNextTargetDirection('left');

    expect(nextDirectionFromAbove).toBe('right');
    expect(nextDirectionFromRight).toBe('below');
    expect(nextDirectionFromBelow).toBe('left');
    expect(nextDirectionFromLeft).toBe('above');
  })
})

describe('Get Opposite Target Direction', () => {
  it('returns opposition direction of what it is given', () => {
    const oppositeDirectionFromAbove = helpers.getOppositeTargetDirection('above');
    const oppositeDirectionFromRight = helpers.getOppositeTargetDirection('right');
    const oppositeDirectionFromBelow = helpers.getOppositeTargetDirection('below');
    const oppositeDirectionFromLeft = helpers.getOppositeTargetDirection('left');

    expect(oppositeDirectionFromAbove).toBe('below');
    expect(oppositeDirectionFromRight).toBe('left');
    expect(oppositeDirectionFromBelow).toBe('above');
    expect(oppositeDirectionFromLeft).toBe('right');

  })
})

describe('Create Board with Random Pieces', () => {
  const myBoard = helpers.createBoardWithRandomPieces();

  it('is a 10x10 board ', () => {
    expect(myBoard.length).toBe(10);
    expect(myBoard[0].length).toBe(10);
  });

  it('has piece objects on a spot with all correct properties', () => {
    expect(myBoard[0][0]).toHaveProperty('piece');
    expect(myBoard[0][0]).toHaveProperty('pos');
    expect(myBoard[0][0]).toHaveProperty('hit');
    expect(myBoard[0][0]).toHaveProperty('show');
  });
})  

describe('Check if ship is destroyed', () => {
  const fleet = [
    ["ACC", 1, 5],
    ["BS", 4, 4],
    ["C", 1, 3],
    ["D", 1, 3],
    ["S", 0, 2]
  ]
  const testShipName1 = {piece: 'BS'};
  const testShipName2 = {piece: 'D'};

  it('should return true when fleet hits equal fleet pieces', () => {
    const isDestroyed = helpers.isShipDestroyed(testShipName1, fleet)
    expect(isDestroyed).toBe(true);
  })
  it('should return true when fleet hits equal fleet pieces', () => {
    const isDestroyed = helpers.isShipDestroyed(testShipName2, fleet)
    expect(isDestroyed).toBe(false);
  })  
})

describe('Destroy Random Spot On Player Board', () => {
  const {row, col } = helpers.destroyRandomSpotOnPlayerBoard(playerBoard);
  const rowLength = playerBoard.length;
  const colLength = playerBoard[0].length;
  it('should return a row and column on board', () => {
    expect(row).toBeLessThan(rowLength);
    expect(row).toBeGreaterThanOrEqual(0);
    expect(col).toBeLessThan(colLength);
    expect(col).toBeGreaterThanOrEqual(0);
  })
})