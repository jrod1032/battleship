import { connect } from 'react-redux';
import GamePhaseBoard from '../components/GamePhaseBoard.jsx';

const getGamePhaseWording = (gamePhase) => {
  if (gamePhase === 'pregamePhase'){
    return 'Select Your Ships';
  } else if (gamePhase === 'battlePhase') {
    return 'Battle!'
  } else if (gamePhase === 'endGame') {
    return 'Game Over'
  }
}

const mapStateToProps = state => {
  return {
    gamePhase: getGamePhaseWording(state.gamePhase)
  }
}

export default connect(
  mapStateToProps
  )(GamePhaseBoard);