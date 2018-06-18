import { connect } from 'react-redux';
import FleetStats from '../components/FleetStats.jsx'


const getShipsRemaining = (fleets) => {
  return fleets.filter( fleet => fleet[1] !== fleet[2])
}

const mapStateToProps = state => {
  return {
    enemyFleet: getShipsRemaining(state.gameLogic.enemyFleet),
    playerFleet: getShipsRemaining(state.gameLogic.playerFleet)
  }
}

export default connect(
  mapStateToProps
  )(FleetStats)