import { decideWhichSpotToHit, destroyRandomSpotOnPlayerBoard } from '../../lib/index.js';
import { playerBoard, enemyBoard } from '../data/testBoards.js';

const computerLogicState = {
  didComputerHitLastTurn: true,
  firstSpotHit: [1, 1],
  lastSpotHit: [1, 2],
  mode: 'target',
  targetDirection: 'right',
  targetShipHitCount: 1
}

describe('Target Mode', () => {

  it('should hit next spot in same direction when hit last time', () => {
    let { didComputerHitLastTurn, firstSpotHit, lastSpotHit, mode, targetDirection, targetShipHitcount } = computerLogicState
    const { row, col, currentTargetDirection } = decideWhichSpotToHit(playerBoard, mode, firstSpotHit, lastSpotHit, targetDirection, didComputerHitLastTurn);
    expect(row).toEqual(1);
    expect(col).toEqual(3);
    expect(currentTargetDirection).toBe('right')
  })

  it('should hit next spot in next direction when did not hit last time', () => {
    let { didComputerHitLastTurn, firstSpotHit, lastSpotHit, mode, targetDirection, targetShipHitcount } = computerLogicState;
    didComputerHitLastTurn = false;
    targetDirection = 'below'
    const { row, col, currentTargetDirection } = decideWhichSpotToHit(playerBoard, mode, firstSpotHit, lastSpotHit, targetDirection, didComputerHitLastTurn);
    expect(row).toEqual(2);
    expect(col).toEqual(1);
    expect(currentTargetDirection).toBe('below')
  })

  it('should return different target direction when space of next spot to hit has already been hit', () => {
    let { didComputerHitLastTurn, firstSpotHit, lastSpotHit, mode, targetDirection, targetShipHitcount } = computerLogicState;
    didComputerHitLastTurn = false;
    targetDirection = 'below';
    playerBoard[2][1].hit = true;
    const { row, col, currentTargetDirection } = decideWhichSpotToHit(playerBoard, mode, firstSpotHit, lastSpotHit, targetDirection, didComputerHitLastTurn);
    expect(row).toEqual(1);
    expect(col).toEqual(0);
    expect(currentTargetDirection).toBe('left')
    //reset player board
    playerBoard[2][1].hit = false;
  }) 

  it('should return to checking firstSpotHit when lastSpotHit is true, but no valid spot to hit next', () => {
    let { didComputerHitLastTurn, firstSpotHit, lastSpotHit, mode, targetDirection, targetShipHitcount } = computerLogicState;
    playerBoard[0][2].hit = true;
    playerBoard[1][3].hit = true;
    playerBoard[2][2].hit = true;
    playerBoard[1][1].hit = true;  
    const { row, col, currentTargetDirection } = decideWhichSpotToHit(playerBoard, mode, firstSpotHit, lastSpotHit, targetDirection, didComputerHitLastTurn);
  
    expect(row).toEqual(2);
    expect(col).toEqual(1);
    expect(currentTargetDirection).toBe('below');
    //reset player board
    playerBoard[0][2].hit = false;
    playerBoard[1][3].hit = false;
    playerBoard[2][2].hit = false;
    playerBoard[1][1].hit = false;  
  }) 

})

describe('Hunt Mode', () => {
  it('should call destroyRandomSpot function', () => {
    const mode = 'hunt'
    const mockFunction = jest.fn(decideWhichSpotToHit);
    const { row, col } =  mockFunction(playerBoard, mode);
    expect(mockFunction).toHaveBeenCalled();
    expect(mockFunction).toHaveBeenCalledWith(playerBoard, mode);
  })

  // it('should return an odd number for row and col', () => {
  //   let { didComputerHitLastTurn, firstSpotHit, lastSpotHit, mode, targetDirection, targetShipHitcount } = computerLogicState;
  //   const { row, col, currentTargetDirection } = decideWhichSpotToHit(playerBoard, mode, firstSpotHit, lastSpotHit, targetDirection, didComputerHitLastTurn);
  //   expect(row % 2).toBe(1);
  //   expect(col % 2).toBe(1);
  // })
})