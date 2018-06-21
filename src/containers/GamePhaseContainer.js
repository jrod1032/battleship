import { connect } from 'react-redux';
import GamePhaseBoard from '../components/GamePhaseBoard.jsx';
import { PLAYER_NAME  } from '../gameConstants.js';

const getGamePhaseWording = (gamePhase, player) => {
  if (gamePhase === 'pregamePhase'){
    return 'Select Your Ships';
  } else if (gamePhase === 'battlePhase') {
    return 'Battle!'
  } else if (gamePhase === 'endGame') {
    return player === PLAYER_NAME ? `You Lose!` : 'You Win'
  }
}

const mapStateToProps = state => {
  return {
    gamePhase: getGamePhaseWording(state.gamePhase, state.gameLogic.turn)
  }
}

export default connect(
  mapStateToProps
  )(GamePhaseBoard);